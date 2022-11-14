"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const axios_1 = tslib_1.__importDefault(require("axios"));
exports.default = {
    data: new builders_1.SlashCommandBuilder()
        .setName('shorten')
        .setDescription(`Shortens a given URL`)
        .addStringOption((option) => option.setName('url').setDescription('The URL to Shorten').setRequired(true)).setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.SendMessages).setDMPermission(false),
    execute: async (interaction) => {
        const url = interaction.options.get('url')?.value?.toString();
        await axios_1.default
            .post(process.env.LINK_SHORTENER_ENDPOINT, { url: url })
            .then((response) => interaction.reply({ ephemeral: true, content: response.data.shortLink }));
    },
};
