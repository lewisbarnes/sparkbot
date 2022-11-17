import dayjs from 'dayjs';
import { Client, Events, Interaction } from 'discord.js';
import { commands } from '../deployCommands';
import { sockets, commandLog } from '../webPanel';
import { db } from '../index';

export const interactionCreateHandler = (client: Client): void => {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    const command = commands.find((command) => command.data.name == interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction, client);
      const executedCommand = {
        timestamp: dayjs().valueOf(),
        username: `${interaction.user.username}#${interaction.user.discriminator}`,
        command: `/${interaction.commandName}`,
      };
      commandLog.push(executedCommand);
      await db.push(
        '/commands',
        [...commandLog.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)).slice(0, 20)],
        false
      );
      sockets.forEach((socket) => {
        socket.emit('commandExecuted', executedCommand);
      });
    } catch (error) {
      if (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  });
};
