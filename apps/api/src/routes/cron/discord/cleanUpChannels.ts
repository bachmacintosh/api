import { type Env, type RESTGetAPIChannelMessagesResult, Routes } from "../../../types";
import type { REST } from "@discordjs/rest";

export default async function cleanUpChannels(env: Env, rest: REST): Promise<void> {
  const discordChannels = [env.DISCORD_CHANNEL_GITHUB, env.DISCORD_CHANNEL_SENSIBO, env.DISCORD_CHANNEL_STEAM] as const;
  for (const channel of discordChannels) {
    let hasMoreMessages = true;
    let before = "";
    while (hasMoreMessages) {
      let queryString = `?limit=100`;
      if (before !== "") {
        queryString += `&before=${before}`;
      }
      // eslint-disable-next-line no-await-in-loop -- Must be in order
      const messages = (await rest.get(
        `${Routes.channelMessages(channel)}${queryString}`,
      )) as RESTGetAPIChannelMessagesResult;
      if (messages.length === 0) {
        hasMoreMessages = false;
      } else if (messages.length === 1) {
        hasMoreMessages = false;
        // eslint-disable-next-line no-await-in-loop -- Must be in order
        await rest.delete(`${Routes.channelMessage(env.DISCORD_CHANNEL_SENSIBO, messages[0].id)}`);
      } else {
        const messageIds = new Set<string>();
        messages.sort((messageA, messageB) => {
          const messageIdA = BigInt(messageA.id);
          const messageIdB = BigInt(messageB.id);
          const sortResult = messageIdA - messageIdB;
          if (sortResult < Number.MIN_SAFE_INTEGER || sortResult > Number.MAX_SAFE_INTEGER) {
            throw new RangeError("Returned ID range is too big to sort.");
          }
          return Number(sortResult);
        });
        for (const message of messages) {
          if (messages.indexOf(message) === 0) {
            before = message.id;
          }
          messageIds.add(message.id);
        }
        const messageIdArray = Array.from(messageIds);
        // eslint-disable-next-line no-await-in-loop -- Must be in order
        await rest.post(Routes.channelBulkDelete(env.DISCORD_CHANNEL_SENSIBO), { body: { messages: messageIdArray } });
      }
    }
  }
}
