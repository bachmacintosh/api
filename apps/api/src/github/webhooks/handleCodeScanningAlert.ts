import {
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
              resultEmbed(alertLevel, "Code Scanning Alert Appeared in Branch", event.repository.full_name, [
                { name: "Severity", value: event.alert.rule.severity ?? "<unknown>", inline: true },
                { name: "Rule", value: event.alert.rule.description, inline: true },
              ]),
            ],
            components: [actionRow(linkButton("View Alert", event.alert.url))],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    case "closed_by_user":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [
            resultEmbed("info", "Code Scanning Alert Closed by User", event.sender.login, [
              { name: "Repository", value: event.repository.full_name, inline: true },
              { name: "Severity", value: event.alert.rule.severity ?? "<unknown>", inline: true },
              { name: "Rule", value: event.alert.rule.description, inline: true },
            ]),
          ],
          components: [actionRow(linkButton("View Alert", event.alert.url))],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "created": {
      throw new Error('Not implemented yet: "created" case');
    }
    case "fixed": {
      throw new Error('Not implemented yet: "fixed" case');
    }
    case "reopened": {
      throw new Error('Not implemented yet: "reopened" case');
    }
    case "reopened_by_user": {
      throw new Error('Not implemented yet: "reopened_by_user" case');
    }
    default: {
      throw new StatusError(HttpStatusCode.NotImplemented, "Unknown Code Scanning Alert Event Action");
    }
  }
};

export default handleCodeScanningAlert;
