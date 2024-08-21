# Chat Application 

Simple chat application experiment for exploring websockets and htmx.

Supports only text messages for now.

## Building and Running

### Postgres setup
`$ docker run --name chat-postgres -e POSTGRES_PASSWORD=chatdemo -d postgres`


## TODOs and Aspirations
- clean up build scripts: add script for local public/ web server
- improve UI: make chat window scale vertically to viewport
- Support multiple "chat groups/rooms"
- Support non-anonymous users and basic authentication, as well as SSL/TLS
- Persistence for messages
- Re-architect for horizontal scalibility of websockets server 
- send only notification of new message over websocket (supply only message ID/room ID?), follow up with HTMX GET for payload

## Attributions

Tailwind components from https://flowbite.com/
SVG avatars from https://www.svgrepo.com
