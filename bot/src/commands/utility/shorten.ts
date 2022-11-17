import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import { Client, CommandInteraction } from 'discord.js';
import { Command } from 'bot/src/types/command';

export default {
  data: new SlashCommandBuilder()
    .setName('shorten')
    .setDescription(`Shortens a given URL`)
    .addStringOption((option) =>
      option.setName('url').setDescription('The URL to Shorten').setRequired(true)
    ),
  async execute(interaction: CommandInteraction, client: Client) {
    const url = interaction.options.get('url')?.value?.toString();
    await axios
      .post(process.env.LINK_SHORTENER_ENDPOINT!, { url: url })
      .then((response) => interaction.reply({ ephemeral: true, content: response.data.shortLink }));
  },
};
