import { type GitHubWebhookEventRunner, type RESTPostAPIChannelMessageJSONBody, Routes } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleIssueComment: GitHubWebhookEventRunner<"issue_comment"> = async (event, env, rest) => {
  switch (event.action) {
    case "created":
      {
        const issueOrPullRequest = typeof event.issue.pull_request === "undefined" ? "Issue" : "Pull Request";
        await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
          body: {
            embeds: [
              githubEmbed({
                title: `[${event.repository.name}] New Comment on ${issueOrPullRequest} #${event.issue.number}: ${event.issue.title}`,
                description: event.comment.body,
                hasMarkdownDescription: true,
                url: event.comment.html_url,
                user: event.sender,
              }),
            ],
          } satisfies RESTPostAPIChannelMessageJSONBody,
        });
      }
      break;
    default:
  }
};

export default handleIssueComment;
