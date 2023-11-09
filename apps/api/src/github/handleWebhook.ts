import type { PingEvent, WebhookEventName } from "@octokit/webhooks-types";
import { StatusError, json } from "itty-router";
import type { Env } from "../types";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import getRest from "../discord/getRest";
import handlePing from "./webhooks/handlePing";

export default async function handleWebhook(request: Request, env: Env): Promise<Response> {
  const eventHeader = request.headers.get("X-GitHub-Event");
  if (eventHeader === null) {
    throw new StatusError(HttpStatusCode.UnprocessableEntity, "Missing X-GitHub-Event header");
  }
  const rest = getRest(env);
  const eventName = eventHeader as WebhookEventName;
  switch (eventName) {
    case "ping":
      {
        const pingEvent = await request.json<PingEvent>();
        await handlePing(pingEvent, env, rest);
      }
      break;
    default:
      throw new StatusError(HttpStatusCode.NotImplemented, `GitHub Webhook Event ${eventHeader} Not Implemented`);
  }
  return json({ message: "Webhook successfully processed!" }, { status: HttpStatusCode.Ok });
}
