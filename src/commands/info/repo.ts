import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('repo')
    .setDescription(`Replies with the bot's GitHub repository`),
  async execute(interaction: CommandInteraction) {
    interaction.reply({ content: 'https://github.com/lewisbarnes/sparkbot', ephemeral: true });
  },
};
