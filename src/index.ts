import dotenv from 'dotenv';
import { Client } from 'discord.js';
import ready from './listeners/ready';

import * as hello from './commands/dev';

dotenv.config();
console.log('Bot is starting...');
const client = new Client({
  intents: [],
});
ready(client);
client.login(process.env.DISCORD_BOT_TOKEN);
