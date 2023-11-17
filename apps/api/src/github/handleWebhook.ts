import {
  type CodeScanningAlertEvent,
  type DependabotAlertEvent,
  type DiscussionCommentEvent,
  type DiscussionEvent,
  type Env,
  type IssueCommentEvent,
  type IssuesEvent,
  type MetaEvent,
  type PingEvent,
  type RESTPostAPIChannelMessageJSONBody,
  Routes,
  type WebhookEventName,
} from "../types";
import { StatusError, json } from "itty-router";
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
        const payload = await request.json<CodeScanningAlertEvent>();
        await env.QUEUE.send({ method: "processGitHubWebhook", params: { event: "code_scanning_alert", payload } });
      }
      break;
    case "dependabot_alert":
      {
        const payload = await request.json<DependabotAlertEvent>();
        await env.QUEUE.send({ method: "processGitHubWebhook", params: { event: "dependabot_alert", payload } });
      }
      break;
    case "discussion":
      {
        const payload = await request.json<DiscussionEvent>();
        await env.QUEUE.send({ method: "processGitHubWebhook", params: { event: "discussion", payload } });
      }
      break;
    case "discussion_comment":
      {
        const payload = await request.json<DiscussionCommentEvent>();
        await env.QUEUE.send({ method: "processGitHubWebhook", params: { event: "discussion_comment", payload } });
      }
      break;
    case "issue_comment":
      {
        const payload = await request.json<IssueCommentEvent>();
        await env.QUEUE.send({ method: "processGitHubWebhook", params: { event: "issue_comment", payload } });
      }
      break;
    case "issues":
      {
        const payload = await request.json<IssuesEvent>();
        await env.QUEUE.send({ method: "processGitHubWebhook", params: { event: "issues", payload } });
      }
      break;
    case "meta":
      {
        const payload = await request.json<MetaEvent>();
        await env.QUEUE.send({ method: "processGitHubWebhook", params: { event: "meta", payload } });
      }
      break;
    case "ping":
      {
        const payload = await request.json<PingEvent>();
        await env.QUEUE.send({ method: "processGitHubWebhook", params: { event: "ping", payload } });
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
  return json({ message: "Webhook Payload Accepted" }, { status: HttpStatusCode.Accepted });
}
