import type { Client } from 'discord.js';
import express from 'express';
import * as http from 'http';
import { Server as WebSocketServer, Socket } from 'socket.io';
import { db } from './index';

import cors from 'cors';

type BaseInteractionEvent = {
  timestamp: number;
  username: string;
};

type SentMessage = BaseInteractionEvent & { message: string };

type ExecutedCommand = BaseInteractionEvent & { command: string };

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

  const PORT = 3000;

  app.use(cors());

  app.get('/', (_req: any, _res) => {
    _res.send('SparkBot Server, use frontend to access');
  });

  app.get('/api/commands', async (_req: any, _res) => {
    _res.send(await db.getData('/commands'));
  });

  app.get('/api/uptime', async (_req: any, _res) => {
    _res.send({ uptime: client.uptime });
  });

  io.on('connection', (socket) => {
    sockets.push(socket);
    socket.emit('initialData', commandLog);
    socket.on('uptimeRequest', () => {
      socket.emit('uptimeUpdate', client.uptime);
    });
    socket.on('nameChange', async (arg) => {
      try {
        await client.user?.setUsername(arg);
      } catch (e) {}
    });
    socket.on('initialDataRequest', () => {
      socket.emit('initialData', commandLog);
    });
    socket.on('disconnect', () => {
      const socketToRemove = sockets.findIndex((s) => s.id == socket.id);
      if (socketToRemove) {
        sockets.splice(socketToRemove, 1);
      }
    });
  });

  server.listen(PORT, () => {
    console.log(`Socket server started on http://localhost:${PORT}`);
  });
};
