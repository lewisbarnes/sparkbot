import { ActivityType, Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import deployCommands from './deployCommands';
import { interactionCreateHandler } from './listeners/interactionCreate';
import { messageCreateHandler } from './listeners/messageCreate';
import startWebPanel from './webPanel';

import { JsonDB, Config } from 'node-json-db';

export const db = new JsonDB(new Config('sparkbot', true, false, '/'));

dotenv.config();
console.log('Bot is starting...');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', async () => {
  if (!client.user || !client.application) {
    return;
  }

  console.log(`Logged in as: ${client.user.username}#${client.user.discriminator}`);

  deployCommands(client);
  messageCreateHandler(client);
  interactionCreateHandler(client);
  startWebPanel(client);

  client.user.setPresence({
    activities: [{ type: ActivityType.Watching, name: 'for slash commands' }],
  });
});

client.login(process.env.DISCORD_BOT_TOKEN);
