document.addEventListener('DOMContentLoaded', function() {
  // Clear chat function
  function clearChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = `
      <div class="chatbot-message bot">
👋 Hello! Welcome to Arah Infotech — your trusted partner in AI, Digital Marketing, and Software Solutions. How can I help you today?
      </div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Chatbot HTML (with mode toggle INSIDE header)
  const chatbotHTML = `
    <div id="chatbot-container" class="chatbot-container">
      <div class="chatbot-box">
        <div class="chatbot-header">
          <h3 class="chatbot-header-title">Arah Assistant</h3>
          <button id="chatbot-close" class="chatbot-close">&times;</button>
        </div>

      
        <div id="chat-messages" class="chatbot-body"></div>

        <div class="chatbot-input-section">
          <input type="text" id="user-input" placeholder="Type your message..." class="chatbot-input">
          <button id="send-button" class="chatbot-send-btn">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
    <button id="chatbot-toggle" class="chatbot-toggle-button">
      <i class="fas fa-robot"></i>
    </button>
  `;

  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  // Get elements
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const toggleButton = document.getElementById('chatbot-toggle');
  const chatbot = document.getElementById('chatbot-container');
  const closeBtn = document.getElementById('chatbot-close');

  // Default chat mode

  // Initial message
  chatMessages.innerHTML = `
    <div class="chatbot-message bot">
👋Hello! Welcome to Arah Infotech — your trusted partner in AI, Digital Marketing, and Software Solutions. How can I help you today?
    </div>
  `;

  // Send message function
  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Clear chat command
    if (
      message.toLowerCase().includes('clear the chat') ||
      message.toLowerCase().includes('clear chat') ||
      message.toLowerCase().includes('start new chat') ||
      message.toLowerCase().includes('new chat')
    ) {
      clearChat();
      userInput.value = '';
      return;
    }

    // Add user message
    chatMessages.innerHTML += `
      <div class="chatbot-message user">
        ${message}
      </div>
    `;
    userInput.value = '';

    // Show typing indicator
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'chatbot-typing-indicator';
    thinkingDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    chatMessages.appendChild(thinkingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      // Send ALL messages to backend
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ message }),
     });
      const data = await response.json();

      // Show bot response
      chatMessages.removeChild(thinkingDiv);
      chatMessages.innerHTML += `
        <div class="chatbot-message bot">
          ${data.reply}
        </div>
      `;
    } catch (error) {
      // Error handling
      chatMessages.removeChild(thinkingDiv);
      chatMessages.innerHTML += `
        <div class="chatbot-message bot" style="color: #d32f2f;">
          Oops! Please try again later.
        </div>`;
      console.error("Error:", error);
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);
  toggleButton.addEventListener('click', () => {
    chatbot.style.display = chatbot.style.display === 'none' ? 'block' : 'none';
  });
  closeBtn.addEventListener('click', () => {
    chatbot.style.display = 'none';
  });
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

 
});
