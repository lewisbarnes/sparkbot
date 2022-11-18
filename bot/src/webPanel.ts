import type { Client } from 'discord.js';
import express from 'express';
import * as http from 'http';
import { Server as WebSocketServer, Socket } from 'socket.io';
import { db } from './index';

import cors from 'cors';

type BaseInteractionEvent = {
  timestamp: number;
  userID: string;
  username: string;
};

type SentMessage = BaseInteractionEvent & {
  message: string;
};

export type ExecutedCommand = BaseInteractionEvent & {
  command: string;
  response: string;
  options: {
    name: string;
    value: string;
  }[];
  id: string;
};

type InteractionEvent = SentMessage | ExecutedCommand;

export const sockets: Socket[] = [];
export const commandLog: InteractionEvent[] = [];

export default (client: Client) => {
  const app = express();
  const server = http.createServer(app);
  const io = new WebSocketServer(server, {
    cors: {
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST'],
    },
  });

  const PORT = process.env.NODE_ENV == 'development' ? 3000 : 443;

  app.use(cors());

  app.use(express.static(__dirname + '/webpanel/public'));

  app.get('/', (_req: any, _res) => {
    _res.sendFile(__dirname + '/webpanel/index.html');
  });

  app.get('/api/commands', async (_req: any, _res) => {
    _res.send(await db.getData('/commands'));
  });

  app.get('/api/uptime', async (_req: any, _res) => {
    _res.send({
      uptime: client.uptime,
    });
  });

  server.listen(PORT);
  console.log(`Socket server started on http://localhost:${PORT}`);
};
