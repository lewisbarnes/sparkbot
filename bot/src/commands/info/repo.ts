import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('repo')
    .setDescription(`Replies with the bot's GitHub repository`),
  async execute(interaction: CommandInteraction, client: Client) {
    interaction.reply({ content: 'https://github.com/lewisbarnes/sparkbot', ephemeral: true });
  },
};
