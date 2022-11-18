import dayjs from 'dayjs';
import { Client, Events, Interaction } from 'discord.js';
import { commands } from '../deployCommands';
import { sockets, commandLog, ExecutedCommand } from '../webPanel';
import { db } from '../index';

export const interactionCreateHandler = (client: Client): void => {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    const command = commands.find(
      (command) => command.data.name == interaction.commandName,
    );
    if (!command) return;
    try {
      const response = await command.execute(interaction, client);
      const executedCommand: ExecutedCommand = {
        timestamp: dayjs().valueOf(),
        username: `${interaction.user.username}#${interaction.user.discriminator}`,
        userID: interaction.user.id,
        command: `/${interaction.commandName}`,
        options: interaction.options.data.map((x) => {
          return { name: x.name, value: x.value?.toString()! };
        }),
        response: `${response ? JSON.stringify(response, null, 2) : ''}`,
        id: interaction.id,
      };
      commandLog.push(executedCommand);
      await db.push(
        '/commands',
        [...commandLog.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))],
        false,
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
