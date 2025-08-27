// socket code in js.
const socket = io.connect("http://localhost:3000");

const username = prompt("Enter your name");
console.log(username);
// emit the username to the server
socket.emit("new-user", username)

const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const allMessages = document.getElementById("messages");

sendBtn.addEventListener("click", () => {
  const message = messageInput.value;
  console.log("message", message);
  socket.emit("user-message", message); // emit means ake send koro
  messageInput.value = ""; // clear input after sending
});

socket.on("message-distributeto-all", (userMessage) => {
  console.log(userMessage)
  const p = document.createElement("p");
  p.innerText = userMessage.name + " : " + userMessage.message;
  allMessages.appendChild(p);
  //console.log("message-distributeto-all", message);
});
