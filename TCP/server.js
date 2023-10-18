var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
var port = process.env.PORT || 3000;

app.get("/", function (req, res) {
  console.log("hit");
  //res.sendFile(__dirname + '/index.html');
});

io.on("connection", function (socket) {
  socket.on("chat message", function (msg) {
    io.emit("chat message", "response from socket");
    console.log("the msg is", msg);
  });
  //socket.emit("chat message", "socket emit");
  console.log("io connected");
});

io.on("disconnect", function () {
  // Do stuff (probably some jQuery)
  console.log("io connected");
});

var server = http.listen(port, function () {
  console.log("listening on *:" + port);
});

io.listen(server);
