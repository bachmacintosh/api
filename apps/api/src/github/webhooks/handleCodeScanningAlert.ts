import type { DiscordErrorLevel, GitHubWebhookEventRunner } from "../../types";
import capitalize from "../../util/capitalize";
import githubEmbed from "../../discord/embeds/githubEmbed";
import resultEmbed from "../../discord/embeds/resultEmbed";

const handleCodeScanningAlert: GitHubWebhookEventRunner<"code_scanning_alert"> = (event) => {
  const branch = event.ref.replace("refs/heads/", "");
  switch (event.action) {
    case "appeared_in_branch": {
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
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Appered in \`${branch}\` Branch`,
          description: `Found ${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule: "${
            event.alert.rule.description
          }"`,
          url: event.alert.html_url,
          user: event.sender,
          level: alertLevel,
        }),
      };
    }
    case "closed_by_user":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Closed by User`,
          description: `${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule "${
            event.alert.rule.description
          }" was closed for the following reason: ${event.alert.dismissed_reason ?? "Unknown"}`,
          url: event.alert.html_url,
          user: event.sender,
        }),
      };
    case "created": {
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
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Created`,
          description: `Found ${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule: "${
            event.alert.rule.description
          }"`,
          url: event.alert.html_url,
          user: event.sender,
          level: alertLevel,
        }),
      };
    }
    case "fixed":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Fixed`,
          description: `${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule: "${
            event.alert.rule.description
          }" was fixed by code changes.`,
          url: event.alert.html_url,
          user: event.sender,
          level: "success",
        }),
      };
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
        return {
          needsMention: true,
          embed: githubEmbed({
            title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Reopened`,
            description: `Found ${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule: "${
              event.alert.rule.description
            }"`,
            url: event.alert.html_url,
            user: event.sender,
            level: alertLevel,
          }),
        };
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
        return {
          needsMention: true,
          embed: githubEmbed({
            title: `[${event.repository.name}] Code Scanning Alert #${event.alert.number} Reopened by User`,
            description: `${capitalize(event.alert.rule.severity ?? "Unknown Severity")} Rule: "${
              event.alert.rule.description
            }"`,
            url: event.alert.html_url,
            user: event.sender,
            level: alertLevel,
          }),
        };
      }
      break;
    default: {
      console.error(event);
      return {
        needsMention: true,
        embed: resultEmbed("error", "Unknown Code Scanning Alert Event Action"),
      };
    }
  }
};

export default handleCodeScanningAlert;
