const socket = io('http://localhost:3000');

const userName = prompt("Enter Your Name");

const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");

socket.emit("new-user", userName);

socket.on("new-user-connected", name => {
    appendUser(name+" Joined")
});

socket.on("user-disconnected", (name) => {
  appendUser(name + " Disconnected");
});

socket.on("user-msg", data => {
    appendReceiver(data.message, data.userName);
})

sendBtn.addEventListener("click", e => {
    e.preventDefault();
    appendSender(messageInput.value);
    socket.emit("send-msg", { message : messageInput.value, userName : userName });
});

function appendSender(message) {
    var container = document.getElementById("container");
    var sender = document.createElement("div");
    sender.className = "sender";
    var msg = document.createElement("div");
    msg.className = "msg";
    msg.innerText = message;
    sender.appendChild(msg);
    container.appendChild(sender);
}

function appendReceiver(message, userName) {
  var container = document.getElementById("container");
  var receiver = document.createElement("div");
  receiver.className = "receiver";
  var msg = document.createElement("div");
  msg.className = "msg";
  msg.innerText = message;
  var name = document.createElement("div");
  name.className = "name";
  name.innerText = userName;
  receiver.appendChild(name);
  receiver.appendChild(msg);
  container.appendChild(receiver);
}

function appendUser(name) {
  var container = document.getElementById("container");
  var user = document.createElement("div");
  user.className = "user";
  var msg = document.createElement("div");
  msg.className = "msg";
  msg.innerText = name;
  user.appendChild(msg);
  container.appendChild(user);
}