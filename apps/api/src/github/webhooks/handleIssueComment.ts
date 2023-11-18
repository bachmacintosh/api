import type { GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleIssueComment: GitHubWebhookEventRunner<"issue_comment"> = (event) => {
  switch (event.action) {
    case "created": {
      const issueOrPullRequest = typeof event.issue.pull_request === "undefined" ? "Issue" : "Pull Request";
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] New Comment on ${issueOrPullRequest} #${event.issue.number}: ${event.issue.title}`,
          description: event.comment.body,
          hasMarkdownDescription: true,
          url: event.comment.html_url,
          user: event.sender,
        }),
      };
    }
    default:
      return null;
  }
};

export default handleIssueComment;
