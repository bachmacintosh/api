import { type GitHubWebhookEventRunner, type RESTPostAPIChannelMessageJSONBody, Routes } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";
import mentionUser from "../../discord/content/mentionUser";

const handleDiscussion: GitHubWebhookEventRunner<"discussion"> = async (event, env, rest) => {
  switch (event.action) {
    case "created":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [
            githubEmbed({
              title: `[${event.repository.name}] New Discussion #${event.discussion.number}: ${event.discussion.title}`,
              description: event.discussion.body,
              hasMarkdownDescription: true,
              url: event.discussion.html_url,
              user: event.sender,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "reopened":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [
            githubEmbed({
              title: `[${event.repository.name}] Discussion #${event.discussion.number} Reopened: ${event.discussion.title}`,
              description: event.discussion.body,
              hasMarkdownDescription: true,
              url: event.discussion.html_url,
              user: event.sender,
            }),
          ],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    default:
  }
};

export default handleDiscussion;
