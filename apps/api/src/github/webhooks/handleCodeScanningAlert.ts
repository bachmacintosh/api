import {
  type APIEmbedField,
  type DiscordErrorLevel,
  type GitHubWebhookEventRunner,
  type RESTPostAPIChannelMessageJSONBody,
  Routes,
} from "../../types";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import { StatusError } from "itty-router";
import actionRow from "../../discord/components/actionRow";
import linkButton from "../../discord/components/buttons/linkButton";
import mentionUser from "../../discord/content/mentionUser";
import resultEmbed from "../../discord/embeds/resultEmbed";

const handleCodeScanningAlert: GitHubWebhookEventRunner<"code_scanning_alert"> = async (event, env, rest) => {
  let branchOrUser = event.ref.replace("refs/heads/", "");
  if (event.action === "closed_by_user" || event.action === "reopened_by_user") {
    branchOrUser = event.sender.login;
  }
  const embedFields: APIEmbedField[] = [
    { name: "Repository", value: event.repository.full_name, inline: true },
    {
      name: event.action === "closed_by_user" || event.action === "reopened_by_user" ? "User" : "Branch",
      value: branchOrUser,
      inline: true,
    },
    { name: "Severity", value: event.alert.rule.severity ?? "<unknown>", inline: true },
    { name: "Rule", value: event.alert.rule.description, inline: true },
  ];
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
              resultEmbed(
                alertLevel,
                "Code Scanning Alert Appeared in Branch",
                "An existing Code Scanning Alert has appeared in another branch.",
                embedFields,
              ),
            ],
            components: [actionRow(linkButton("View Alert", event.alert.html_url))],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    case "closed_by_user":
      embedFields.push({ name: "Reason", value: event.alert.dismissed_reason ?? "<unknown>", inline: true });
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            resultEmbed(
              "info",
              "Code Scanning Alert Closed by User",
              "A user has manually closed the Code Scanning Alert.",
              embedFields,
            ),
          ],
          components: [actionRow(linkButton("View Alert", event.alert.html_url))],
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
              resultEmbed(
                alertLevel,
                "Code Scanning Alert Created",
                "GitHub has created a new Code Scanning Alert in the repository.",
                embedFields,
              ),
            ],
            components: [actionRow(linkButton("View Alert", event.alert.html_url))],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    case "fixed":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            resultEmbed(
              "success",
              "Code Scanning Alert Fixed",
              "A recent code change or update has fixed the Code Scanning Alert.",
              embedFields,
            ),
          ],
          components: [actionRow(linkButton("View Alert", event.alert.html_url))],
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
              resultEmbed(
                alertLevel,
                "Code Scanning Alert Reopened",
                "The Code Scanning Alert was reopened by GitHub",
                embedFields,
              ),
            ],
            components: [actionRow(linkButton("View Alert", event.alert.html_url))],
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
              resultEmbed(
                alertLevel,
                "Code Scanning Alert Reopened by User",
                "A user has reopened a previously closed Code Scanning Alert.",
                embedFields,
              ),
            ],
            components: [actionRow(linkButton("View Alert", event.alert.html_url))],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    default: {
      throw new StatusError(HttpStatusCode.NotImplemented, "Unknown Code Scanning Alert Event Action");
    }
  }
};

export default handleCodeScanningAlert;
