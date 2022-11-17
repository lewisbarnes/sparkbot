import { Client, REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import type { Command } from './types/command';

export const commands = Array<Command>();

const getCommands = (path: string, commandFiles: string[]) => {
  fs.readdirSync(path).forEach((entry) => {
    const stat = fs.lstatSync(`${path}/${entry}`);
    if (stat.isFile() && entry.endsWith('.ts')) {
      commandFiles.push(`${path}/${entry}`);
    } else if (stat.isDirectory()) {
      getCommands(`${path}/${entry}`, commandFiles);
    }
  });
  return commandFiles;
};

export default async (client: Client) => {
  if (!client.user || !client.application) {
    return;
  }

  try {
    for (const file of getCommands(path.join(__dirname, `/commands`), [])) {
      let command = await import(file.replace(`${process.env.ROOT_DIR}`, '.'));
      commands.push(command.default);
    }

    // client.application.commands.set(commands.map((command) => command.data));
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);

    const data = (await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands.map((command) => command.data.toJSON()),
    })) as Array<any>;
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};
