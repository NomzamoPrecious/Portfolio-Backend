
// UI TOGGLE CONTROLS

const toggleBtn = document.getElementById("ai-assistant-toggle");
const chatWindow = document.getElementById("ai-chat-window");
const closeChat = document.getElementById("close-chat");

toggleBtn.addEventListener("click", () => {
    chatWindow.classList.add("active");
});

closeChat.addEventListener("click", () => {
    chatWindow.classList.remove("active");
});


// SEND MESSAGE

const sendBtn = document.getElementById("send-message");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

// Add user message to chat
function addUserMessage(text) {
    chatMessages.innerHTML += `
        <div class="message user-message">
            <div class="message-content">${text}</div>
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add AI message to chat
function addAIMessage(text) {
    chatMessages.innerHTML += `
        <div class="message ai-message">
            <div class="message-content">${text}</div>
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Typing indicator
function showTypingIndicator() {
    chatMessages.innerHTML += `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.querySelector(".typing-indicator");
    if (typing) typing.remove();
}


// FETCH FROM YOUR VERCEL BACKEND

async function sendToAI(message) {
    showTypingIndicator();

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });

    removeTypingIndicator();

    const data = await response.json();
    addAIMessage(data.reply);
}


// WHEN USER PRESSES SEND

sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    userInput.value = "";

    sendToAI(message);
});

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});


// QUICK QUESTIONS

document.querySelectorAll(".quick-question").forEach(btn => {
    btn.addEventListener("click", () => {
        const question = btn.dataset.question;
        addUserMessage(question);
        sendToAI(question);
    });
});


let messagesSent = 0;

sendBtn.addEventListener("click", () => {
    if(messagesSent >= 15) {
        addAIMessage("⚠️ You reached the limit for this session.");
        return;
    }
    messagesSent++;
    const message = userInput.value.trim();
    addUserMessage(message);
    sendToAI(message);
});

