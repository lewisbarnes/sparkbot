import { Client } from 'discord.js';
import deployCommands from '../deployCommands';
import interactionCreate from './interactionCreate';

export default (client: Client): void => {
  client.on('ready', async () => {
    if (!client.user || !client.application) {
      return;
    }

    deployCommands(client);
		interactionCreate(client);

    console.log(`${client.user.username} is online`);
  });
};
