import { type GitHubWebhookEventRunner, type RESTPostAPIChannelMessageJSONBody, Routes } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";
import mentionUser from "../../discord/content/mentionUser";

const handleIssues: GitHubWebhookEventRunner<"issues"> = async (event, env, rest) => {
  switch (event.action) {
    case "assigned":
      if (
        typeof event.assignee !== "undefined" &&
        event.assignee !== null &&
        event.assignee.login === "bachmacintosh"
      ) {
        await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
          body: {
            content: mentionUser(env.DISCORD_MENTION_ID),
            embeds: [
              githubEmbed({
                title: `Issue #${event.issue.number} Assigned: ${event.issue.title}`,
                description: event.issue.body ?? "",
                hasMarkdownDescription: true,
                url: event.issue.html_url,
                user: event.sender,
              }),
            ],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    case "closed":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            githubEmbed({
              title: `Issue #${event.issue.number} Closed: ${event.issue.title}`,
              description: `Issue was closed for the following reason: ${event.issue.state_reason ?? "Unknown"}`,
              hasMarkdownDescription: true,
              url: event.issue.html_url,
              user: event.sender,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "locked":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            githubEmbed({
              title: `Issue #${event.issue.number} Locked: ${event.issue.title}`,
              description: `Issue was locked for the following reason: ${event.issue.active_lock_reason ?? "Unknown"}`,
              hasMarkdownDescription: true,
              url: event.issue.html_url,
              user: event.sender,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "opened":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [
            githubEmbed({
              title: `New Issue #${event.issue.number}: ${event.issue.title}`,
              description: event.issue.body ?? "",
              hasMarkdownDescription: true,
              url: event.issue.html_url,
              user: event.sender,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "reopened":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [
            githubEmbed({
              title: `Issue #${event.issue.number} Reopened: ${event.issue.title}`,
              description: event.issue.body ?? "",
              hasMarkdownDescription: true,
              url: event.issue.html_url,
              user: event.sender,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "unlocked":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [
            githubEmbed({
              title: `Issue #${event.issue.number} Unlocked: ${event.issue.title}`,
              description: "Issue is once again open for discussion.",
              hasMarkdownDescription: true,
              url: event.issue.html_url,
              user: event.sender,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    default:
  }
};

export default handleIssues;
