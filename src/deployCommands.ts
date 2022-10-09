const { REST, Routes } = require('discord.js');
import { Client } from "discord.js";
import fs from "node:fs";


export let commands = Array<{ data: any, execute: Function}>();

export default async (client: Client) => {
	if (!client.user || !client.application) {
		return;
	}

	const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

	for(const file of commandFiles) {
		await import(`./commands/${file}`).then(result => commands.push(result.default));
	}
	console.log('Registered Commands:','\n'+commands.map(command => command.data).map(command => command.name).join('\n'));
	client.application.commands.set(commands.map(command => command.data));
}