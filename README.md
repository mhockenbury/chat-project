# Chat Application 

Simple chat application experiment for exploring websockets and htmx.

Supports only text messages for now.

## Building and Running

### Postgres setup
`$ docker run --name chat-postgres -e POSTGRES_PASSWORD=chatdemo -p 5432:5432 -d postgres`

### Schema
```sql
-- SCHEMA: chat

-- DROP SCHEMA IF EXISTS chat ;

CREATE SCHEMA IF NOT EXISTS chat
    AUTHORIZATION postgres;

-- Table: chat.messages

-- DROP TABLE IF EXISTS chat.messages;

CREATE TABLE IF NOT EXISTS chat.messages
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    content text COLLATE pg_catalog."default",
    CONSTRAINT messages_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS chat.messages
    OWNER to postgres;

INSERT INTO chat.messages(content) VALUES ('Hello, this is a test');
INSERT INTO chat.messages(content) VALUES ('Blah blah blah');
INSERT INTO chat.messages(content) VALUES ('Another message');
```


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
