import dayjs from 'dayjs';
import { Client, Events, Interaction } from 'discord.js';
import { commands } from '../deployCommands';

export const interactionCreateHandler = (client: Client): void => {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    const command = commands.find((command) => command.data.name == interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
      console.log(
        `[${dayjs().format('DD/MM/YYYY HH:mm:ss')}] User ${interaction.user.username}#${
          interaction.user.discriminator
        }(${interaction.user.id}) executed command /${interaction.commandName}`
      );
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
