document.addEventListener('DOMContentLoaded', () => {
    const chatbotHeader = document.getElementById('chatbot-header');
    const chatbotBody = document.getElementById('chatbot-body');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
  
    // Verificar que los elementos existen
    if (!chatbotHeader || !chatbotBody || !sendButton || !userInput) {
      console.error('Uno o más elementos no se encontraron en el DOM.');
      console.error('chatbotHeader:', chatbotHeader);
      console.error('chatbotBody:', chatbotBody);
      console.error('sendButton:', sendButton);
      console.error('userInput:', userInput);
      return;
    }
  
    // Toggle la visibilidad del cuerpo del chatbot
    chatbotHeader.addEventListener('click', () => {
      chatbotBody.style.display = chatbotBody.style.display === 'none' ? 'block' : 'none';
    });
  
    // Función para agregar mensajes al chat
    function addMessage(message, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', sender);
      messageDiv.textContent = message;
      chatbotBody.appendChild(messageDiv);
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
  
    // Función para manejar el envío de mensajes
    async function sendMessage() {
      const message = userInput.value.trim();
      if (message === '') return;
  
      addMessage(message, 'user');
      userInput.value = '';
  
      try {
        const response = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });
  
        const data = await response.json();
  
        if (data.redirect) {
          addMessage(data.reply, 'bot');
          // Agregar enlace de WhatsApp como un mensaje HTML
          const contactMessage = document.createElement('div');
          contactMessage.classList.add('message', 'bot');
          contactMessage.innerHTML = `👉 <a href="${data.redirect}" target="_blank">Contacta con nosotros en WhatsApp</a>`;
          chatbotBody.appendChild(contactMessage);
        } else {
          addMessage(data.reply, 'bot');
        }
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        addMessage('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.', 'bot');
      }
    }
  
    // Eventos para enviar el mensaje
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  });
  