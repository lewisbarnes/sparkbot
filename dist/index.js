"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
const ready_1 = tslib_1.__importDefault(require("./listeners/ready"));
dotenv_1.default.config();
console.log('Bot is starting...');
const client = new discord_js_1.Client({
    intents: [],
});
(0, ready_1.default)(client);
client.login(process.env.DISCORD_BOT_TOKEN);
