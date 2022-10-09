import { CommandInteraction, Client, ApplicationCommand } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import type { Command } from '../types/command';

export default <Command> {
  data: new SlashCommandBuilder()
    .setName('shorten')
    .setDescription(`Shortens a given URL`)
    .addStringOption((option) =>
      option.setName('url').setDescription('The URL to Shorten').setRequired(true)
    ),
  execute: async (interaction: CommandInteraction) => {
    const url = interaction.options.get('url')?.value?.toString();
    await axios
      .post(process.env.LINK_SHORTENER_ENDPOINT!, { url: url })
      .then((response) => interaction.reply({ ephemeral: true, content: response.data.shortLink }));
  },
};
