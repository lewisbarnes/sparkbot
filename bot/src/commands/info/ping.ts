import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription(`See bot latency`),
  async execute(interaction: CommandInteraction, client: Client) {
    await interaction.deferReply({
      ephemeral: true,
    });
    await interaction.editReply('Pinging...').then(async () => {
      console.log(interaction.createdAt.toString());
      const ping = dayjs.duration(dayjs().valueOf() - dayjs(interaction.createdAt).utc().valueOf());
      const apiPing = interaction.client.ws.ping;

      await interaction.editReply({
        content: `Pong! 🏓`,
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.client.user.username,
              iconURL: interaction.client.user.displayAvatarURL(),
            })
            .setColor('Aqua')
            .addFields([
              { name: 'Bot Latency', value: `${ping.asMilliseconds()}ms` },
              { name: 'API Latency', value: `${apiPing}ms` },
            ])
            .setFooter({
              text: `Requested by ${interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL(),
            }),
        ],
      });
    });
  },
};
