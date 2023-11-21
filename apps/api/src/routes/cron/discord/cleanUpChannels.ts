import {
  type Env,
  type RESTGetAPIChannelMessagesResult,
  type RESTPostAPIChannelMessagesBulkDeleteJSONBody,
  Routes,
} from "../../../types";
import type { REST } from "@discordjs/rest";
import snowflakeToDate from "../../../discord/snowflakeToDate";

export default async function cleanUpChannels(env: Env, rest: REST): Promise<void> {
  const MESSAGE_BATCH_LIMIT = 100;
  const ONE_DAY = 8.64e7;
  const TWO_WEEKS = 1.21e9;
  const discordChannels = [env.DISCORD_CHANNEL_GITHUB, env.DISCORD_CHANNEL_SENSIBO, env.DISCORD_CHANNEL_STEAM] as const;
  for (const channel of discordChannels) {
    let hasMoreMessages = true;
    let before = "";
    while (hasMoreMessages) {
      let queryString = `?limit=${MESSAGE_BATCH_LIMIT}`;
      if (before !== "") {
        queryString += `&before=${before}`;
      }
      // eslint-disable-next-line no-await-in-loop -- Must be in order
      const messages = (await rest.get(
        `${Routes.channelMessages(channel)}${queryString}`,
      )) as RESTGetAPIChannelMessagesResult;
      const hasMessagesOlderThanTwoWeeks = messages.some((message) => {
        const currentTime = Date.now();
        const messageTime = snowflakeToDate(message.id).getTime();
        return currentTime - messageTime >= TWO_WEEKS;
      });
      if (messages.length < MESSAGE_BATCH_LIMIT || hasMessagesOlderThanTwoWeeks) {
        hasMoreMessages = false;
      }
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
        const currentTime = Date.now();
        const messageTime = snowflakeToDate(message.id).getTime();
        const shouldDelete =
          message.author.id === env.DISCORD_BOT_CLIENT_ID &&
          currentTime - messageTime >= ONE_DAY &&
          currentTime - messageTime < TWO_WEEKS;
        if (messages.indexOf(message) === 0) {
          before = message.id;
        }
        if (shouldDelete) {
          messageIds.add(message.id);
        }
      }
      const messageIdArray = Array.from(messageIds);
      if (messageIdArray.length === 1) {
        // eslint-disable-next-line no-await-in-loop -- Must be in order
        await rest.delete(Routes.channelMessage(channel, messageIdArray[0]));
      } else if (messageIdArray.length > 1) {
        // eslint-disable-next-line no-await-in-loop -- Must be in order
        await rest.post(Routes.channelBulkDelete(channel), {
          body: { messages: messageIdArray } satisfies RESTPostAPIChannelMessagesBulkDeleteJSONBody,
        });
      }
    }
  }
}
