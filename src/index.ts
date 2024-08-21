import { render } from "ejs";
import WebSocket, { WebSocketServer } from "ws";
import { readFileSync } from "fs";

const messageTemplate = readFileSync(
  "./public/message-template.ejs"
).toString();

const wss = new WebSocketServer({
  port: 8080,
});

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);

    const message = parseWebSocketData(data);
    const messageHTML = renderChatMessageHTML(message);
    // broadcast to all connected clients
    broadcastHTML(messageHTML);
  });
});

function broadcastHTML(messageHTML: string) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageHTML);
    }
  });
}

function parseWebSocketData(data: WebSocket.RawData): object {
  const message = JSON.parse(data.toString());
  return message;
}

function renderChatMessageHTML(message: object): string {
  const messageHTML = render(messageTemplate, { data: message });
  return messageHTML;
}
