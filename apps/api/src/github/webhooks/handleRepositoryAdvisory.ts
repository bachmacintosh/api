import type { GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleRepositoryAdvisory: GitHubWebhookEventRunner<"repository_advisory"> = (event) => {
  switch (event.action) {
    case "published":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Published Security Advisory`,
          description: event.repository_advisory.summary,
          url: event.repository_advisory.html_url,
          user: event.sender,
          level: "error",
        }),
      };
    case "reported":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Reported Security Advisory`,
          description: event.repository_advisory.summary,
          url: event.repository_advisory.html_url,
          user: event.sender,
          level: "error",
        }),
      };
    default:
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Unknown Security Advisory Event`,
          description: event.repository_advisory.summary,
          url: event.repository_advisory.html_url,
          user: event.sender,
          level: "error",
        }),
      };
  }
};

export default handleRepositoryAdvisory;
