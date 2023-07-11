/* import { WebSocketServer } from "ws";
declare global {
  var wss: WebSocketServer;
} */
export default defineEventHandler((event) => {
  /* console.log("server get " + globalThis.clients[0].id);
  if (!globalThis.wss) {
    globalThis.wss = new WebSocketServer({
      server: event.node.res.socket?.server,
    });
    globalThis.wss.on("connection", function (socket) {
      globalThis.wss.clients.forEach((client) => {
        client.send("you are connected" + Math.random());
      });
      console.log("New client connected");
    });
  } */

  return "I'm the websocket server";
});
