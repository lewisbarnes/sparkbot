import { CommandInteraction, Client, ApplicationCommand } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	data: new SlashCommandBuilder().setName('dev').setDescription(`Replies with the Developer's GitHub Profile`),
	execute: (interaction: CommandInteraction) => {
		interaction.reply({ content: 'https://github.com/lewisbarnes', ephemeral: true });
	}
}