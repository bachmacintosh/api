import {
  type APIEmbedField,
  type DiscordErrorLevel,
  type GitHubWebhookEventRunner,
  type RESTPostAPIChannelMessageJSONBody,
  Routes,
} from "../../types";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import { StatusError } from "itty-router";
import githubEmbed from "../../discord/embeds/githubEmbed";
import mentionUser from "../../discord/content/mentionUser";
import resultEmbed from "../../discord/embeds/resultEmbed";

const handleDependabotAlert: GitHubWebhookEventRunner<"dependabot_alert"> = async (event, env, rest) => {
  let fixedVersion = "<none>";
  if (event.alert.security_vulnerability.first_patched_version !== null) {
    fixedVersion = event.alert.security_vulnerability.first_patched_version.identifier;
  }
  const embedFields: APIEmbedField[] = [];
  if (typeof event.alert.dependency.package !== "undefined") {
    embedFields.push({
      name: "Package",
      value: `${event.alert.dependency.package.ecosystem}: ${event.alert.dependency.package.name}`,
      inline: true,
    });
  }
  embedFields.push(
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
  );
  switch (event.action) {
    case "auto_dismissed":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            githubEmbed({
              title: `[${event.repository.name}] Dependabot Alert #${event.alert.number} Auto-Dismissed`,
              description: "The alert was automatically dismissed, possibly due to a withdrawal.",
              url: event.alert.html_url,
              user: event.sender,
              fields: embedFields,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "auto_reopened":
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
              githubEmbed({
                title: `[${event.repository.name}] Dependabot Alert #${event.alert.number} Auto-Reopened`,
                description:
                  "The alert was automatically reopened, possibly due to a regression in manifest file changes.",
                url: event.alert.html_url,
                user: event.sender,
                fields: embedFields,
                level: alertLevel,
              }),
            ],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
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
              githubEmbed({
                title: `[${event.repository.name}] Dependabot Alert #${event.alert.number} Created`,
                description: "Dependabot has detected a vulnerable package in the manifest file(s) of the repository.",
                url: event.alert.html_url,
                user: event.sender,
                fields: embedFields,
                level: alertLevel,
              }),
            ],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    case "dismissed":
      embedFields.push({ name: "Reason", value: event.alert.dismissed_reason ?? "<unknown>" });
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            githubEmbed({
              title: `[${event.repository.name}] Dependabot Alert #${event.alert.number} Dismissed`,
              description: "The alert was dismissed by a user.",
              url: event.alert.html_url,
              user: event.sender,
              fields: embedFields,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "fixed": {
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            githubEmbed({
              title: `[${event.repository.name}] Dependabot Alert #${event.alert.number} Fixed`,
              description: "A manifest file update has resolved the alert.",
              url: event.alert.html_url,
              user: event.sender,
              fields: embedFields,
              level: "success",
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    }
    case "reintroduced":
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
              githubEmbed({
                title: `[${event.repository.name}] Dependabot Alert #${event.alert.number} Re-Introduced`,
                description: "A previously handled Dependabot Alert has reappeared in the repository.",
                url: event.alert.html_url,
                user: event.sender,
                fields: embedFields,
                level: alertLevel,
              }),
            ],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    case "reopened":
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
              githubEmbed({
                title: `[${event.repository.name}] Dependabot Alert #${event.alert.number} Reopened`,
                description: "A user has reopened a Dependabot Alert in the repository.",
                url: event.alert.html_url,
                user: event.sender,
                fields: embedFields,
                level: alertLevel,
              }),
            ],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    default:
      console.error(event);
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            resultEmbed("error", "Unknown Dependabot Alert Event Action", "See logs for the event and its action."),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      throw new StatusError(HttpStatusCode.NotImplemented, "Unknown Dependabot Alert Event Action");
  }
};

export default handleDependabotAlert;
