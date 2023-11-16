import {
  type DiscordErrorLevel,
  type GitHubWebhookEventRunner,
  type RESTPostAPIChannelMessageJSONBody,
  Routes,
} from "../../types";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import { StatusError } from "itty-router";
import capitalize from "../../util/capitalize";
import githubEmbed from "../../discord/embeds/githubEmbed";
import mentionUser from "../../discord/content/mentionUser";
import resultEmbed from "../../discord/embeds/resultEmbed";

const handleCodeScanningAlert: GitHubWebhookEventRunner<"code_scanning_alert"> = async (event, env, rest) => {
  const branch = event.ref.replace("refs/heads/", "");
  switch (event.action) {
    case "appeared_in_branch":
      {
        let alertLevel: DiscordErrorLevel = "warn";
        switch (event.alert.rule.severity) {
          case "error":
            alertLevel = "error";
            break;
          case "none":
          case "note":
            alertLevel = "info";
            break;
          default:
        }
        await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
          body: {
            content: mentionUser(env.DISCORD_MENTION_ID),
            embeds: [
              githubEmbed({
                title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Appered in \`${branch}\` Branch`,
                description: `Found ${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule: "${
                  event.alert.rule.description
                }"`,
                url: event.alert.html_url,
                user: event.sender,
                level: alertLevel,
              }),
            ],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    case "closed_by_user":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            githubEmbed({
              title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Closed by User`,
              description: `${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule "${
                event.alert.rule.description
              }" was closed for the following reason: ${event.alert.dismissed_reason ?? "Unknown"}`,
              url: event.alert.html_url,
              user: event.sender,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "created":
      {
        let alertLevel: DiscordErrorLevel = "warn";
        switch (event.alert.rule.severity) {
          case "error":
            alertLevel = "error";
            break;
          case "none":
          case "note":
            alertLevel = "info";
            break;
          default:
        }
        await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
          body: {
            content: mentionUser(env.DISCORD_MENTION_ID),
            embeds: [
              githubEmbed({
                title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Created`,
                description: `Found ${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule: "${
                  event.alert.rule.description
                }"`,
                url: event.alert.html_url,
                user: event.sender,
                level: alertLevel,
              }),
            ],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    case "fixed":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            githubEmbed({
              title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Fixed`,
              description: `${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule: "${
                event.alert.rule.description
              }" was fixed by code changes.`,
              url: event.alert.html_url,
              user: event.sender,
              level: "success",
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "reopened":
      {
        let alertLevel: DiscordErrorLevel = "warn";
        switch (event.alert.rule.severity) {
          case "error":
            alertLevel = "error";
            break;
          case "none":
          case "note":
            alertLevel = "info";
            break;
          default:
        }
        await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
          body: {
            content: mentionUser(env.DISCORD_MENTION_ID),
            embeds: [
              githubEmbed({
                title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Reopened`,
                description: `Found ${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule: "${
                  event.alert.rule.description
                }"`,
                url: event.alert.html_url,
                user: event.sender,
                level: alertLevel,
              }),
            ],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    case "reopened_by_user":
      {
        let alertLevel: DiscordErrorLevel = "warn";
        switch (event.alert.rule.severity) {
          case "error":
            alertLevel = "error";
            break;
          case "none":
          case "note":
            alertLevel = "info";
            break;
          default:
        }
        await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
          body: {
            content: mentionUser(env.DISCORD_MENTION_ID),
            embeds: [
              githubEmbed({
                title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Reopened by User`,
                description: `${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule: "${
                  event.alert.rule.description
                }"`,
                url: event.alert.html_url,
                user: event.sender,
                level: alertLevel,
              }),
            ],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    default: {
      console.error(event);
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [resultEmbed("error", "Unknown Code Scanning Alert Event Action")],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      throw new StatusError(HttpStatusCode.NotImplemented, "Unknown Code Scanning Alert Event Action");
    }
  }
};

export default handleCodeScanningAlert;
