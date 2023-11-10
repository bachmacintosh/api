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

const handleDependabotAlert: GitHubWebhookEventRunner<"dependabot_alert"> = async (event, env, rest) => {
  let fixedVersion = "<none>";
  // TODO: Check on this in future updates of Octokit's Webhook Types; this can be null
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Bug in Types
  if (event.alert.security_vulnerability.first_patched_version !== null) {
    fixedVersion = event.alert.security_vulnerability.first_patched_version.identifier;
  }
  let userOrDependabot = "Dependabot";
  if (event.action === "dismissed" || event.action === "reopened") {
    userOrDependabot = event.sender.login;
  }
  const embedFields: APIEmbedField[] = [
    { name: "Repository", value: event.repository.full_name, inline: true },
    { name: "Number", value: event.alert.number.toString(), inline: true },
    { name: "By", value: userOrDependabot, inline: true },
    {
      name: "Package",
      value: `${event.alert.dependency.package.ecosystem}: ${event.alert.dependency.package.name}`,
      inline: true,
    },
    {
      name: "CVE or GHSA",
      value: event.alert.security_advisory.cve_id ?? event.alert.security_advisory.ghsa_id,
      inline: true,
    },
    { name: "Summary", value: event.alert.security_advisory.summary, inline: true },
    {
      name: "Vulnerable Versions",
      value: event.alert.security_vulnerability.vulnerable_version_range,
      inline: true,
    },
    { name: "Fixed Version", value: fixedVersion, inline: true },
  ];
  switch (event.action) {
    case "dismissed": {
      throw new Error('Not implemented yet: "dismissed" case');
    }
    case "fixed": {
      throw new Error('Not implemented yet: "fixed" case');
    }
    case "created":
      {
        let alertLevel: DiscordErrorLevel = "warn";
        switch (event.alert.security_advisory.severity) {
          case "low":
            alertLevel = "info";
            break;
          case "high":
          case "critical":
            alertLevel = "error";
            break;
          default:
        }
        await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
          body: {
            content: mentionUser(env.DISCORD_MENTION_ID),
            embeds: [
              resultEmbed(
                alertLevel,
                "New Dependabot Alert",
                "Dependabot has created a new alert in a repository.",
                embedFields,
              ),
            ],
            components: [actionRow(linkButton("View Alert", event.alert.html_url))],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    case "reintroduced": {
      throw new Error('Not implemented yet: "reintroduced" case');
    }
    case "reopened": {
      throw new Error('Not implemented yet: "reopened" case');
    }
    default: {
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [resultEmbed("error", "Unknown Dependabot Alert Event Action")],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      throw new StatusError(HttpStatusCode.NotImplemented, "Unknown Dependabot Alert Event Action");
    }
  }
};

export default handleDependabotAlert;
