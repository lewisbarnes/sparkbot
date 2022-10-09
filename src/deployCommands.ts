import { Client } from 'discord.js';
import fs from 'node:fs';
import type { Command } from './types/command';

export const commands = Array<Command>();

export default async (client: Client) => {
  if (!client.user || !client.application) {
    return;
  }
  const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
  for (const file of commandFiles) {
    await import(`./commands/${file}`).then((result) => commands.push(result.default));
  }
  client.application.commands.set(commands.map((command) => command.data));
};
