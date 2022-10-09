import { CommandInteraction, Client, ApplicationCommand } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import type { Command } from '../types/command';

export default <Command> {
  data: new SlashCommandBuilder()
    .setName('dev')
    .setDescription(`Replies with the Developer's GitHub Profile`),
  execute: async (interaction: CommandInteraction) => {
    interaction.reply({ content: 'https://github.com/lewisbarnes', ephemeral: true });
  },
};
