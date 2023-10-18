const express = require("express");
const app = express();
const server = require("http").createServer(app);

const websocket = require("ws");
const wss = new websocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("A New Client Connected");
  ws.send("Welcome New Client");

  ws.on("message", function incoming(message) {
    console.log("Received Message > ", message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === websocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.get("/", (req, res) => res.send("Hello World"));

server.listen(3000, () => console.log("Listen On Port 3000"));
