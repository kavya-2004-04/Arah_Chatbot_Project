const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const { getGeminiResponse } = require("./external-apis");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());





// ---------------- Load responses ----------------
const dataPath = path.join(__dirname, "responses.json");
const { manualResponses, responseTemplates } = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// ---------------- Helpers ----------------
const isGibberish = (text) => {
  const cleanText = text.replace(/\s+/g, '').toLowerCase();
  return (
    cleanText.length < 2 || /^[^a-zA-Z0-9]+$/.test(cleanText) || /(.)\1{3,}/.test(cleanText)
  );
};

const abusiveWords = new RegExp(
  ['idiot', 'stupid', 'fool', 'scold', 'dumb', 'useless', 'worthless', 'shut up'].join('|'),
  'i'
);

const isExactMatch = (msg, triggers) => triggers.some(t => msg.toLowerCase() === t.toLowerCase());

// ---------------- Chat Memory ----------------
let lastFallback = false;

// ---------------- Helper: Make Gemini replies user-friendly ----------------
function formatGeminiReply(reply, userMessage) {
  if (!reply) return "🤖 Sorry, I couldn’t find a good answer.";

  // Add context awareness & simplify reply
  let friendly = reply.trim();

  // Cut very long answers
  if (friendly.length > 500) {
    friendly = friendly.slice(0, 500) + "...";
  }

  return `✨ Based on your question *"${userMessage}"*:\n\n${friendly}\n\n`;
}


// ---------------- Chat Endpoint ----------------
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message?.trim();
  const lowerMessage = userMessage?.toLowerCase();



  if (!userMessage) {
    return res.json({ reply: "🤖 Please enter a message." });
  }

  const trimmedMsg = lowerMessage.trim();

  // 🟢 Step 1: Phrases that mean "go deeper"
  const deepIntents = [
    "types of", "kinds of", "services in", "different", "categories of"
  ];

  // 🟢 Step 2: If message has deep intent AND mentions a main service → Gemini
  const mainServices = ["digital marketing", "ai", "ml", "web development", "app development", "cloud security"];

  if (
    deepIntents.some(p => userMessage.toLowerCase().includes(p)) &&
    mainServices.some(s => userMessage.toLowerCase().includes(s))
  ) {
    const geminiReply = await getGeminiResponse(userMessage);
    return res.json({ reply: formatGeminiReply(geminiReply, userMessage) });
  }

 // normalize: lowercase + remove spaces
const noSpaceMsg = trimmedMsg.replace(/\s+/g, "");

// Special check for pricing-related queries
if (/\b(pricing|price|cost|charges|fees|prices|get a quote|quotation)\b/.test(trimmedMsg)) {
  return res.json({
    reply: "💡 Our pricing details aren’t public. Please drop us a mail 📩 at ops@arahinfotech.net, and we’ll share a custom quote tailored for you."
  });
}


// check manual responses with/without spaces
const manualMatch = Object.keys(manualResponses).find(key => {
  const keyNoSpace = key.replace(/\s+/g, "");
  return keyNoSpace === noSpaceMsg;
});

if (manualMatch) {
  return res.json({ reply: manualResponses[manualMatch] });
}

// --- 2.1 Who are you / Who r u check ---
if (
  lowerMessage === "who are you" ||
  lowerMessage === "who r u" ||
  lowerMessage === "who ru" ||
  lowerMessage === "who r you" ||
  lowerMessage === "whoru" ||
  lowerMessage === "who is this" ||
  lowerMessage === "who is this bot" ||
  lowerMessage === "who is this chatbot" ||
  lowerMessage === "whoareyou" ||
  lowerMessage === "wru" 
) {
  return res.json({
    reply: "🌟 I'm Arah Infotech chatbot — tech experts building AI and software to help businesses grow smarter and faster."
  });
}


  // --- 3. Gibberish ---
  if (isGibberish(lowerMessage)) {
    return res.json({
      reply: "🤖 I couldn't understand. Try asking about:\n• Our services\n• Technologies we use\n• Career opportunities"
    });
  }

  // --- 4. Confidential words ---
  const confidentialWords = [
    "hr", "manager", "salary", "employee", "ceo", "cto", "director", "owner",
    "founder", "head", "leadership", "team details", "employee info"
  ];
  const wordsInMsg = trimmedMsg.split(/\W+/);
  if (wordsInMsg.some(word => confidentialWords.includes(word))) {
    lastFallback = false;
    return res.json({ reply: responseTemplates.confidential.response });
  }

  // --- 5. Abusive ---
  if (abusiveWords.test(lowerMessage)) {
    lastFallback = false;
    return res.json({
      reply: "🚨 I'm here to help professionally. Please ask about our services or company details."
    });
  }

  // --- 6. Multi-topic template match ---
  const matchedResponses = [];
  for (const template of Object.values(responseTemplates)) {
    if (!template.triggers) continue;
    for (const t of template.triggers) {
      const pattern = new RegExp(`\\b${t.toLowerCase()}\\b`, "i");
      if (pattern.test(lowerMessage)) {
        matchedResponses.push(template.response);
        break;
      }
    }
  }
  if (matchedResponses.length > 0) {
    lastFallback = false;
    return res.json({ reply: matchedResponses.join("\n\n") });
  }

  // --- 7. Single trigger template match ---
  const normalizedMsg = lowerMessage.replace(/\s+/g, " ").trim();
  for (const template of Object.values(responseTemplates)) {
    if (!template.triggers) continue;
    for (const t of template.triggers) {
      const trigger = t.toLowerCase().trim();
      const pattern = new RegExp(`\\b${trigger}\\b`, "i");
      if (pattern.test(normalizedMsg) || isExactMatch(userMessage, template.triggers)) {
        return res.json({ reply: template.response });
      }
    }
  }
// --- 2. Arah check ---
  if (lowerMessage.includes("arah")) {
    return res.json({
      reply: "✨ Arah Infotech is an AI-powered solutions company offering web, mobile, and AI services."
    });
  }
  // --- 8. Gemini Dynamic Response (Restricted to Technical only) ---
  const techKeywords = [
    "javascript","nodejs","react","python","java","html","css","sql",
    "mongodb","express","angular","api","php","springboot","git",
    "cloud","machine learning","ml","deep learning","ai","data","database","server","client","networking","network","api","frontend","backend","user interface","ui","user experience","ux","angular","vue","typescript","c++","c#","ruby","swift","kotlin","flutter","docker","kubernetes","microservices","graphql","rest api","devops","agile","scrum","ci/cd","testing","automation","selenium","jest","mocha","chai","unit testing","integration testing","e2e testing","performance testing","load testing","security testing","seo","search engine optimization","sem","search engine ,marketing","social media marketing","smm","content marketing","email marketing","affiliate marketing","influencer marketing","pay-per click","ppc","mobile marketing","video marketing" ,"supervised learing","unsupervised learning",
  "reinforcement learning","neural networks","natural language processing","computer vision","image processing","data science","big data","data analytics","data visualization","business intelligence","cloud computing","aws","azure","google cloud platform","gcp","saas","paas","iaas","deep learning","generative ai","chatbot","conversational ai","robotic process automation","rpa","internet of things","iot","blockchain","cryptocurrency","cybersecurity","information security","penetration testing","ethical hacking","super ai","self aware ai"];

  const isTechnical = techKeywords.some(keyword =>
    lowerMessage.includes(keyword)
  );

  if (!isTechnical) {
    return res.json({
      reply: "⚡ I only answer technical questions. Please ask me something related to programming, AI, or technology."
    });
  }

  try {
    const dynamicReply = await getGeminiResponse(userMessage);
    if (dynamicReply && !dynamicReply.includes("🤖 No response")) {
      lastFallback = false;
      return res.json({ reply: formatGeminiReply(dynamicReply, userMessage) });
    }
  } catch (err) {
    console.error("Gemini error:", err);
  }


  // --- 9. Fallback flow ---
  if (!lastFallback) {
    lastFallback = true;
    return res.json({
      reply: responseTemplates.fallback.response +
        "\n\nDo you want to ask about our main topics? (Yes/No)"
    });
  }

  if (lastFallback) {
    if (/^yes$/i.test(trimmedMsg)) {
      lastFallback = false;
      return res.json({
        reply: "Great! You can ask about services, AI, ML, Cloud, Careers, or Projects."
      });
    }
    if (/^no$/i.test(trimmedMsg)) {
      lastFallback = false;
      return res.json({
        reply: "👍 Ok, if you need anything later, feel free to reach out!"
      });
    }
  }

  // --- Final fallback ---
  lastFallback = true;
  return res.json({
    reply: responseTemplates.fallback.response +
      "\n\nDo you want to ask about our main topics? (Yes/No)"
  });
});

// ---------------- Server ----------------
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
