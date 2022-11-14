"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const deployCommands_1 = tslib_1.__importDefault(require("../deployCommands"));
const interactionCreate_1 = tslib_1.__importDefault(require("./interactionCreate"));
exports.default = (client) => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }
        (0, deployCommands_1.default)(client);
        (0, interactionCreate_1.default)(client);
        console.log(`${client.user.username} is online`);
    });
};
