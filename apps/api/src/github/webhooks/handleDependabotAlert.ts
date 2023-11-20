import type { APIEmbedField, DiscordErrorLevel, GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";
import resultEmbed from "../../discord/embeds/resultEmbed";

const handleDependabotAlert: GitHubWebhookEventRunner<"dependabot_alert"> = (event) => {
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
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Auto-Dismissed Dependabot Alert #${event.alert.number}`,
          description: "The alert was automatically dismissed, possibly due to a withdrawal.",
          url: event.alert.html_url,
          user: event.sender,
          fields: embedFields,
        }),
      };
    case "auto_reopened": {
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
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Auto-Reopened Dependabot Alert #${event.alert.number}`,
          description: "The alert was automatically reopened, possibly due to a regression in manifest file changes.",
          url: event.alert.html_url,
          user: event.sender,
          fields: embedFields,
          level: alertLevel,
        }),
      };
    }
    case "created": {
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
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Created Dependabot Alert #${event.alert.number}`,
          description: "Dependabot has detected a vulnerable package in the manifest file(s) of the repository.",
          url: event.alert.html_url,
          user: event.sender,
          fields: embedFields,
          level: alertLevel,
        }),
      };
    }
    case "dismissed":
      embedFields.push({ name: "Reason", value: event.alert.dismissed_reason ?? "<unknown>" });
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Dismissed Dependabot Alert #${event.alert.number}`,
          description: "The alert was dismissed by a user.",
          url: event.alert.html_url,
          user: event.sender,
          fields: embedFields,
        }),
      };
    case "fixed": {
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Fixed Dependabot Alert #${event.alert.number}`,
          description: "A manifest file update has resolved the alert.",
          url: event.alert.html_url,
          user: event.sender,
          fields: embedFields,
          level: "success",
        }),
      };
    }
    case "reintroduced": {
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
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Re-Introduced Dependabot Alert #${event.alert.number}`,
          description: "A previously handled Dependabot Alert has reappeared in the repository.",
          url: event.alert.html_url,
          user: event.sender,
          fields: embedFields,
          level: alertLevel,
        }),
      };
    }
    case "reopened": {
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
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Reopened Dependabot Alert #${event.alert.number}`,
          description: "A user has reopened a Dependabot Alert in the repository.",
          url: event.alert.html_url,
          user: event.sender,
          fields: embedFields,
          level: alertLevel,
        }),
      };
    }
    default:
      console.error(event);
      return {
        needsMention: true,
        embed: resultEmbed("error", "Unknown Dependabot Alert Event Action", "See logs for the event and its action."),
      };
  }
};

export default handleDependabotAlert;
