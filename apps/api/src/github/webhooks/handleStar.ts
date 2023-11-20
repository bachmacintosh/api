import type { GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleStar: GitHubWebhookEventRunner<"star"> = (event) => {
  switch (event.action) {
    case "created":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Gained a Star ⭐!`,
          description: `+1 ⭐ by user ${event.sender.login}`,
          level: "success",
        }),
      };
    default:
      return null;
  }
};

export default handleStar;
