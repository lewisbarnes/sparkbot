import type {
  Client,
  CommandInteraction,
  InteractionReplyOptions,
  SlashCommandBuilder,
} from 'discord.js';

export type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction, client: Client) => Promise<InteractionReplyOptions>;
};
