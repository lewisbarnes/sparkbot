import { Console } from 'console';
import { Client, Events, Interaction, Message, MessageType, Typing } from 'discord.js';
import { commands } from '../deployCommands';

const xpMap = new Map<string, number>();

const addXp = (userId: string) => {
  const userXp = xpMap.get(userId);
  if (userXp) {
    xpMap.set(userId, userXp + 1);
  } else {
    xpMap.set(userId, 1);
  }
  return xpMap.get(userId);
};

export const messageCreateHandler = (client: Client): void => {
  client.on(Events.MessageCreate, async (message: Message) => {
    if (message.type == MessageType.Default && message.guildId === process.env.OWNERS_SERVER) {
      const xp = addXp(message.author.id);
    }
  });
};
