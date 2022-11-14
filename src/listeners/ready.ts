import dayjs from 'dayjs';
import { Activity, ActivityFlags, ActivityType, Client } from 'discord.js';
import deployCommands from '../deployCommands';
import { interactionCreateHandler } from './interactionCreate';
import { messageCreateHandler } from './messageCreate';

export default (client: Client): void => {
  client.on('ready', async () => {
    if (!client.user || !client.application) {
      return;
    }

    console.log('Deploying commands!');
    deployCommands(client);
    messageCreateHandler(client);
    interactionCreateHandler(client);

    console.log(
      `Logged in as: ${client.user.username} (${dayjs(client.readyTimestamp).toString()})`
    );

    client.user.setPresence({
      activities: [{ type: ActivityType.Watching, name: 'for slash commands' }],
    });
  });
};
