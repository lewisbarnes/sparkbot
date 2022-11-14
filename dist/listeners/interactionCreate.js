"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deployCommands_1 = require("../deployCommands");
exports.default = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand())
            return;
        const command = deployCommands_1.commands.find(command => command.data.name == interaction.commandName);
        if (!command)
            return;
        try {
            await command.execute(interaction);
        }
        catch (error) {
            if (error)
                console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });
};
