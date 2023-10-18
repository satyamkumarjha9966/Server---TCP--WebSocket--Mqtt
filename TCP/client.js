const io = require("socket.io-client");

const socket = io("http://localhost:3000", {
  reconnectionDelayMax: 10000,
  query: {
    auth: "123",
  },
});
