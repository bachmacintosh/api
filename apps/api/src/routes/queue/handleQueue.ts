/* eslint-disable no-await-in-loop -- Must be in order */
import type { Env, QueueBody, QueueMethods } from "../../types";
import getRest from "../../discord/getRest";
import handleSetAcState from "./methods/handleSetAcState";

export default async function handleQueue(
  batch: MessageBatch<QueueBody<keyof QueueMethods>>,
  env: Env,
  _context: ExecutionContext,
): Promise<void> {
  const rest = getRest(env);
  for (const message of batch.messages) {
    switch (message.body.method) {
      case "setAcState":
        await handleSetAcState(env, rest, message);
        message.ack();
        break;
      // No Default
    }
  }
}
