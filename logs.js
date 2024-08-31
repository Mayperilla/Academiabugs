document.getElementById("chatbot-input").onsubmit = function(e) {
  e.preventDefault();
  var input = document.getElementById("user-input").value;
  console.log('Mensaje enviado:', input); // Ver en las herramientas de desarrollo del navegador
  document.getElementById("user-input").value = "";
  // Resto del código...
};
