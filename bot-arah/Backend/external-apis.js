const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
async function getGeminiResponse(userMessage) {

  try {
    console.log("📡 Sending request to Gemini API with message:", userMessage);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
        }),
      }
    );

    console.log("✅ Gemini API status:", response.status);
    const data = await response.json();
    console.log("📩 Gemini API response:", data);

  if (data.candidates && data.candidates.length > 0) {
  let reply = data.candidates[0].content.parts[0].text;

  // 🪄 Make it user-friendly: shorten to 1–3 sentences
  reply = reply
    .split(/(?<=[.!?])\s+/)   // split into sentences
    .slice(0, 3)              // keep max 3 sentences
    .join(" ");

  return reply;
} else {
  return "🤖 Sorry, I couldn’t find an answer.";
}

  } catch (error) {
    console.error("❌ Gemini API error:", error);
    return "🤖 I’m having trouble connecting to my AI service right now.";
  }
}
module.exports = { getGeminiResponse };