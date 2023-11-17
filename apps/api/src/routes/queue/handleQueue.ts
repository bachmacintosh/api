/* eslint-disable no-await-in-loop -- Must be in order */
import type { Env, QueueBody } from "../../types";
import getRest from "../../discord/getRest";
import handleSetAcState from "./methods/handleSetAcState";

export default async function handleQueue(
  batch: MessageBatch<QueueBody>,
  env: Env,
  _context: ExecutionContext,
): Promise<void> {
  const rest = getRest(env);
  for (const message of batch.messages) {
    try {
      switch (message.body.method) {
        case "processGitHubWebhook":
          break;
        case "setAcState":
          await handleSetAcState(env, rest, message.body.params);
          message.ack();
          break;
        // No Default
      }
    } catch (error) {
      console.error(error);
      message.retry();
    }
  }
}
