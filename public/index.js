var welcomeMessage = document.getElementById("welcome-message");
setTimeout(function () {
  welcomeMessage.classList.add("fade-in");
}, 1000);
setTimeout(function () {
  welcomeMessage.classList.add("fade-out");
}, 5000);
