"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
exports.commands = Array();
exports.default = async (client) => {
    if (!client.user || !client.application) {
        return;
    }
    const commandFiles = node_fs_1.default
        .readdirSync('commands')
        .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        exports.commands.push(command);
    }
    client.application.commands.set(exports.commands.map((command) => command.data));
};
