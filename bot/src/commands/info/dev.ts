import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('dev')
    .setDescription(`Replies with the Developer's GitHub Profile`),
  async execute(interaction: CommandInteraction, client: Client) {
    interaction.reply({ content: 'https://github.com/lewisbarnes', ephemeral: true });
  },
};
