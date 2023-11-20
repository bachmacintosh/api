import type { GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleDiscussionComment: GitHubWebhookEventRunner<"discussion_comment"> = (event) => {
  switch (event.action) {
    case "created":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] New Comment on Discussion #${event.discussion.number}: ${event.discussion.title}`,
          description: event.comment.body,
          hasMarkdownDescription: true,
          url: event.comment.html_url,
          user: event.sender,
        }),
      };
    default:
      return null;
  }
};

export default handleDiscussionComment;
