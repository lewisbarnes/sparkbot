import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dev')
    .setDescription(`Replies with the Developer's GitHub Profile`),
  async execute(interaction: CommandInteraction) {
    interaction.reply({ content: 'https://github.com/lewisbarnes', ephemeral: true });
  },
};
