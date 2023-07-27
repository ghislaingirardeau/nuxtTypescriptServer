import { WebSocketServer } from "ws";

/* type Client = {
  id: string;
  readyState: number;
};

declare global {
  var clients: Client[];
}

globalThis.clients = [{ id: "test", readyState: 35 }]; */

declare global {
  var wss: WebSocketServer;
}

export default defineEventHandler(async (event) => {
  if (globalThis.wss) return;

  globalThis.wss = new WebSocketServer({
    port: 8080,
  });

  globalThis.wss.on("connection", (socket: Socket) => {
    console.log("a user connected");

    globalThis.wss.clients.forEach((client) => {
      client.send("you are connected " + Math.random());
    });
  });
});
