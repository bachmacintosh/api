import type { GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleSecretScanningAlertLocation: GitHubWebhookEventRunner<"secret_scanning_alert_location"> = (event) => {
  let description = "Secret was found in ";
  switch (event.location.type) {
    case "commit":
      description += "a commit.";
      break;
    case "issue_body":
      description += "an issue's body.";
      break;
    case "issue_comment":
      description += "a comment on an issue.";
      break;
    case "issue_title":
      description += "the title of an issue.";
      break;
    default:
      description += "an unknown location.";
  }
  return {
    needsMention: true,
    embed: githubEmbed({
      title: `[${event.repository.name}] New Location on Secret Scanning Alert${
        typeof event.alert.number === "undefined" ? " " : ` #${event.alert.number}`
      }:`,
      description,
      url: event.alert.html_url,
      user: event.sender,
      level: "error",
    }),
  };
};

export default handleSecretScanningAlertLocation;
