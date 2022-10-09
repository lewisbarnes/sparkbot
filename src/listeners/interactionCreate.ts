import { Client, Interaction } from "discord.js";
import { commands } from '../deployCommands';

export default (client: Client): void => {
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;
		const command = commands.find(command => command.data.name == interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction);
		} catch (error) {
			if (error) console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	});
};