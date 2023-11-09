import type { CodeScanningAlertEvent, PingEvent, WebhookEventName } from "@octokit/webhooks-types";
import { StatusError, json } from "itty-router";
import { handleCodeScanningAlert, handlePing } from "./webhooks";
import type { Env } from "../types";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import getRest from "../discord/getRest";

export default async function handleWebhook(request: Request, env: Env): Promise<Response> {
  const eventHeader = request.headers.get("X-GitHub-Event");
  if (eventHeader === null) {
    throw new StatusError(HttpStatusCode.UnprocessableEntity, "Missing X-GitHub-Event header");
  }
  const rest = getRest(env);
  const eventName = eventHeader as WebhookEventName;
  switch (eventName) {
    case "code_scanning_alert":
      {
        const event = await request.json<CodeScanningAlertEvent>();
        await handleCodeScanningAlert(event, env, rest);
      }
      break;
    case "ping":
      {
        const event = await request.json<PingEvent>();
        await handlePing(event, env, rest);
      }
      break;
    default:
      throw new StatusError(HttpStatusCode.NotImplemented, `GitHub Webhook Event ${eventHeader} Not Implemented`);
  }
  return json({ message: "Webhook successfully processed!" }, { status: HttpStatusCode.Ok });
}
