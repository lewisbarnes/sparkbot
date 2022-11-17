import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export default {
  data: new SlashCommandBuilder().setName('uptime').setDescription(`See the bot's current uptime`),
  async execute(interaction: CommandInteraction, client: Client) {
    if (!client.uptime) {
      return;
    }
    const duration = dayjs.duration(client.uptime);
    interaction.reply({
      content: `${Math.floor(duration.asDays())}d ${Math.floor(
        duration.hours()
      )}h ${duration.minutes()}m ${duration.seconds()}s`,
      ephemeral: true,
    });
  },
};
