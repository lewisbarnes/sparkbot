import dayjs from 'dayjs';
import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription(`See bot latency`),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({
      ephemeral: false,
    });
    await interaction.editReply('Pinging...').then(async () => {
      const ping = dayjs(interaction.createdAt).diff(dayjs());
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
              { name: 'Bot Latency', value: `${ping}ms` },
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
