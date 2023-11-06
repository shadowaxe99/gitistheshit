const chatLog = document.getElementById('chat-log');
const userMessageInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  const userMessage = userMessageInput.value;
  if (userMessage.trim() !== '') {
    appendMessage('You', userMessage);
    userMessageInput.value = '';
    scrollToBottom();
  }
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatLog.appendChild(messageElement);
}

function scrollToBottom() {
  chatLog.scrollTop = chatLog.scrollHeight;
}