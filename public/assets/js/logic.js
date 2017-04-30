// Connect to server.
var socket = io.connect("http://localhost:4080");

var userData = { username: "User" + Math.floor(Math.random() * 1000) };

var messageList = document.querySelector('#messageList');

// When a message is received.
socket.on("message", function (data) {
    addMessage(data);
});

socket.on("connect", function (data) {
    socket.emit("new user", { username: userData.username });
    newUser(userData.username);
});

socket.on("new user", function (data) {
    newUser(data.username);
});

socket.on("update user", function (data) {
    info(data.old + " has changed username to " + data.current);
});

// Send message to server.
function sendMessage() {
    socket.emit("message", { username: userData.username, message: document.querySelector("#messager").value });
    addMessage({ username: userData.username, message: document.querySelector("#messager").value });
    //console.log(document.querySelector("#messager").value);
    document.querySelector("#messager").value = "";
}

function info(str) {
    // Create list item to hold entire message.
    var listElement = document.createElement('li');

    // Create the span element to contain the username of sender.
    var message = document.createElement('span');
    message.classList.add("info");
    message.appendChild(document.createTextNode(str));

    listElement.appendChild(message);

    messageList.appendChild(listElement);

    // Scroll the latest message added into view
    listElement.scrollIntoView();
}

function newUser(username) {
    // Create list item to hold entire message.
    var listElement = document.createElement('li');

    // Create the span element to contain the username of sender.
    var message = document.createElement('span');
    message.classList.add("newUser");
    message.appendChild(document.createTextNode(username + ' has joined the chat.'));

    listElement.appendChild(message);

    messageList.appendChild(listElement);

    // Scroll the latest message added into view
    listElement.scrollIntoView();
}

function addMessage(data) {
    // Create list item to hold entire message.
    var listElement = document.createElement('li');

    // Create the span element to contain the username of sender.
    var usernameSpan = document.createElement('span');
    usernameSpan.classList.add("username");
    usernameSpan.appendChild(document.createTextNode(data.username + ': '));

    // Create the span element to contain the message.
    var messageSpan = document.createElement('span');
    messageSpan.classList.add("message");
    messageSpan.appendChild(document.createTextNode(data.message));

    listElement.appendChild(usernameSpan);
    listElement.appendChild(messageSpan);

    messageList.appendChild(listElement);

    // Scroll the latest message added into view
    listElement.scrollIntoView();
}

function updateUsername() {
    var input = document.querySelector("#usernameSetter");

    if (input.value == "") {
        return 0;
    }

    socket.emit("update user", { old: userData.username, current: input.value });
    info(userData.username + " has changed username to " + input.value);

    userData.username = input.value;
    input.value = "";
    document.querySelector("#usernameForm").style.display = "none";
}
