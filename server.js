var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var morgan = require("morgan");

server.listen(4080, function () {
    console.log("Server listening on port 4080");
});

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/views/index.html");
});

io.on("connection", function (socket) {

    socket.on("message", function (data) {
        // Send to all but the sender
        socket.broadcast.emit("message", data);
    });

    socket.on("new user", function (data) {
        socket.broadcast.emit("new user", data);
    });

    socket.on("update user", function (data) {
        socket.broadcast.emit("update user", data);
    });

});