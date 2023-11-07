import type { Env, QueueBody, QueueMethods } from "./types";
import { error, json } from "itty-router";
import fetchRoute from "./routes/fetch";
import handleQueue from "./routes/queue/handleQueue";
import handleScheduled from "./routes/cron/handleScheduled";

const worker: ExportedHandler<Env, QueueBody<keyof QueueMethods>> = {
  fetch: async (request, env, context) => {
    return fetchRoute.handle(request, env, context).then(json).catch(error);
  },
  queue: async (batch, env, context) => {
    await handleQueue(batch, env, context);
  },
  scheduled: (_controller, env, context) => {
    context.waitUntil(handleScheduled(env));
  },
};

export default worker;
