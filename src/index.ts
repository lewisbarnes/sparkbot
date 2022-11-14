import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import ready from './listeners/ready';

import * as hello from './commands/info/dev';

dotenv.config();
console.log('Bot is starting...');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
ready(client);
client.login(process.env.DISCORD_BOT_TOKEN);
