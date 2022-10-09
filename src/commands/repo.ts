import { CommandInteraction, Client, ApplicationCommand } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import type { Command } from '../types/command';

export default <Command> {
    data: new SlashCommandBuilder()
      .setName('repo')
      .setDescription(`Replies with the bot's GitHub repository`),
    execute: async (interaction: CommandInteraction) => {
      interaction.reply({ content: 'https://github.com/lewisbarnes/sparkbot', ephemeral: true });
    },
};
