/* eslint-disable no-await-in-loop -- Must be in order */
import {
  type Env,
  type QueueBody,
  type QueuedEmbed,
  type RESTPostAPIChannelMessageJSONBody,
  Routes,
} from "../../types";
import getRest from "../../discord/getRest";
import handleProcessGitHubWebhook from "./methods/handleProcessGitHubWebhook";
import handleSetAcState from "./methods/handleSetAcState";
import mentionUser from "../../discord/content/mentionUser";
import processEventSubNotification from "./methods/processEventSubNotification";

export default async function handleQueue(
  batch: MessageBatch<QueueBody>,
  env: Env,
  _context: ExecutionContext,
): Promise<void> {
  const rest = getRest(env);
  const queuedEmbeds: QueuedEmbed[] = [];
  for (const message of batch.messages) {
    try {
      switch (message.body.method) {
        case "processGitHubWebhook":
          {
            const result = handleProcessGitHubWebhook(message.body.params);
            if (result !== null) {
              queuedEmbeds.push(result);
            }
          }
          break;
        case "processTwitchEventSub":
          {
            const result = processEventSubNotification(message.body.params);
            if (result !== null) {
              queuedEmbeds.push(result);
            }
          }
          break;
        case "setAcState":
          await handleSetAcState(env, rest, message.body.params);
          message.ack();
          break;
      }
    } catch (error) {
      console.error(error);
      message.retry();
    }
  }
  if (queuedEmbeds.length > 0) {
    try {
      const body: RESTPostAPIChannelMessageJSONBody = {
        embeds: queuedEmbeds.map((queuedEmbed) => {
          return queuedEmbed.embed;
        }),
      };
      const shallMention = queuedEmbeds.some((queuedEmbed) => {
        return queuedEmbed.needsMention;
      });
      if (shallMention) {
        body.content = mentionUser(env.DISCORD_MENTION_ID);
      }
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), { body });
    } catch (error) {
      console.error(error);
      batch.retryAll();
    }
  }
  batch.ackAll();
}
