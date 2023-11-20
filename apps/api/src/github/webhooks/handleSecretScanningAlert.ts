import type { GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleSecretScanningAlert: GitHubWebhookEventRunner<"secret_scanning_alert"> = (event) => {
  switch (event.action) {
    case "created":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Created Secret Scanning Alert #${event.alert.number}`,
          description: `Found the following type of secret: ${event.alert.secret_type ?? "<unknown>"}`,
          url: event.alert.html_url,
          user: event.sender,
          level: "error",
        }),
      };
    case "reopened":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Reopened Secret Scanning Alert #${event.alert.number}`,
          description: `Found the following type of secret: ${event.alert.secret_type ?? "<unknown>"}`,
          url: event.alert.html_url,
          user: event.sender,
          level: "error",
        }),
      };
    case "resolved":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Resolved Secret Scanning Alert #${event.alert.number}`,
          description: `Entered a "${event.alert.resolution ?? "<unknown>"}" resolution with the following comment: ${
            event.alert.resolution_comment ?? "<none>"
          }`,
          url: event.alert.html_url,
          user: event.sender,
          level: "success",
        }),
      };
    case "revoked":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Revoked Secret Scanning Alert #${event.alert.number}`,
          description: `The alert was marked as revoked.`,
          url: event.alert.html_url,
          user: event.sender,
        }),
      };
    default:
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Unknown Secret Scanning Alert Event`,
          description: `An unrecognized event that may need attention was triggered.`,
          url: event.alert.html_url,
          user: event.sender,
          level: "warn",
        }),
      };
  }
};

export default handleSecretScanningAlert;
