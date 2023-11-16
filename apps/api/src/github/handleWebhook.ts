import {
  type CodeScanningAlertEvent,
  type DependabotAlertEvent,
  type DiscussionCommentEvent,
  type DiscussionEvent,
  type Env,
  type IssueCommentEvent,
  type PingEvent,
  type RESTPostAPIChannelMessageJSONBody,
  Routes,
  type WebhookEventName,
} from "../types";
import { StatusError, json } from "itty-router";
import {
  handleCodeScanningAlert,
  handleDependabotAlert,
  handleDiscussion,
  handleDiscussionComment,
  handleIssueComment,
  handlePing,
} from "./webhooks";
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
    case "discussion":
      {
        const event = await request.json<DiscussionEvent>();
        await handleDiscussion(event, env, rest);
      }
      break;
    case "discussion_comment":
      {
        const event = await request.json<DiscussionCommentEvent>();
        await handleDiscussionComment(event, env, rest);
      }
      break;
    case "issue_comment":
      {
        const event = await request.json<IssueCommentEvent>();
        await handleIssueComment(event, env, rest);
      }
      break;
    case "issues":
      break;
    case "meta":
      break;
    case "ping":
      {
        const event = await request.json<PingEvent>();
        await handlePing(event, env, rest);
      }
      break;
    case "pull_request":
      break;
    case "push":
      break;
    case "repository_advisory":
      break;
    case "secret_scanning_alert":
      break;
    case "secret_scanning_alert_location":
      break;
    case "star":
      break;
    default: {
      const data = await request.json();
      console.error("Unimplemented Webhook Event");
      console.error(data);
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [resultEmbed("error", `Unimplemented Webhook Event: ${eventHeader}`)],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      throw new StatusError(HttpStatusCode.NotImplemented, `GitHub Webhook Event ${eventHeader} Not Implemented`);
    }
  }
  return json({ message: "Webhook successfully processed!" }, { status: HttpStatusCode.Ok });
}
