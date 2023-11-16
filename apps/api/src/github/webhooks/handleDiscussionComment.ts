import { type GitHubWebhookEventRunner, type RESTPostAPIChannelMessageJSONBody, Routes } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleDiscussionComment: GitHubWebhookEventRunner<"discussion_comment"> = async (event, env, rest) => {
  switch (event.action) {
    case "created":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          embeds: [
            githubEmbed({
              title: `[${event.repository.name}] New Comment on Discussion #${event.discussion.number}: ${event.discussion.title}`,
              description: event.comment.body,
              hasMarkdownDescription: true,
              url: event.comment.html_url,
              user: event.sender,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    default:
  }
};

export default handleDiscussionComment;
