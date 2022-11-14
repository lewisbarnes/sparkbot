"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
exports.default = {
    data: new builders_1.SlashCommandBuilder()
        .setName('dev')
        .setDescription(`Replies with the Developer's GitHub Profile`).setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.SendMessages).setDMPermission(false),
    execute: async (interaction) => {
        interaction.reply({ content: 'https://github.com/lewisbarnes', ephemeral: true });
    },
};
