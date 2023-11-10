import type {
  CodeScanningAlertEvent,
  DependabotAlertEvent,
  PingEvent,
  WebhookEventName,
} from "@octokit/webhooks-types";
import { type Env, type RESTPostAPIChannelMessageJSONBody, Routes } from "../types";
import { StatusError, json } from "itty-router";
import { handleCodeScanningAlert, handleDependabotAlert, handlePing } from "./webhooks";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import getRest from "../discord/getRest";
import mentionUser from "../discord/content/mentionUser";
import resultEmbed from "../discord/embeds/resultEmbed";

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
    case "dependabot_alert":
      {
        const event = await request.json<DependabotAlertEvent>();
        await handleDependabotAlert(event, env, rest);
      }
      break;
    case "ping":
      {
        const event = await request.json<PingEvent>();
        await handlePing(event, env, rest);
      }
      break;
    default:
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [resultEmbed("error", `Unimplemented Webhook Event: ${eventHeader}`)],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      throw new StatusError(HttpStatusCode.NotImplemented, `GitHub Webhook Event ${eventHeader} Not Implemented`);
  }
  return json({ message: "Webhook successfully processed!" }, { status: HttpStatusCode.Ok });
}
