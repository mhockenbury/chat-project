import fastify from "fastify";
import sql from "./db";
import fastifyWebsocket from "@fastify/websocket";
import WebSocket from "ws";
import { render } from "ejs";
import { readFileSync } from "fs";

const messageTemplate = readFileSync(
  "./public/message-template.ejs"
).toString();

const server = fastify();
server.register(fastifyWebsocket);

async function testDB() {
  const results = await sql`
  select * from chat.messages
  `;
  console.log(results);
  return results;
}

server.register(async function (fastify) {
  server.get("/", { websocket: true }, async (ws, req) => {
    ws.on("message", function message(data) {
      console.log("received: %s", data);
      
      const message = parseWebSocketData(data);
      ws.send(renderChatMessageHTML(message));
    });
  });
});

server.get("/messages", async function(request, reply) {
  const results = await testDB();
  return results;

})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

function parseWebSocketData(data: WebSocket.RawData): object {
  const message = JSON.parse(data.toString());
  return message;
}

function renderChatMessageHTML(message: object): string {
  const messageHTML = render(messageTemplate, { data: message });
  return messageHTML;
}
