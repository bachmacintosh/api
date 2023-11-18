import type { GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleDiscussion: GitHubWebhookEventRunner<"discussion"> = (event) => {
  switch (event.action) {
    case "created":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] New Discussion #${event.discussion.number}: ${event.discussion.title}`,
          description: event.discussion.body,
          hasMarkdownDescription: true,
          url: event.discussion.html_url,
          user: event.sender,
        }),
      };
    case "reopened":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Reopened Discussion #${event.discussion.number}: ${event.discussion.title}`,
          description: event.discussion.body,
          hasMarkdownDescription: true,
          url: event.discussion.html_url,
          user: event.sender,
        }),
      };
    default:
      return null;
  }
};

export default handleDiscussion;
