import { Client, CommandInteraction, hyperlink, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('invite').setDescription(`Add the bot to a server`),
  async execute(interaction: CommandInteraction, client: Client) {
    const link = hyperlink(
      'Invite Me!',
      `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_APP_ID}&permissions=2048&scope=bot%20applications.commands%20messages.read`
    );

    interaction.reply({
      content: link,
      ephemeral: true,
    });
  },
};
