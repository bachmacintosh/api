import {
  type APIEmbedField,
  type GitHubWebhookEventRunner,
  type RESTPostAPIChannelMessageJSONBody,
  Routes,
} from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";
import mentionUser from "../../discord/content/mentionUser";

const handleMeta: GitHubWebhookEventRunner<"meta"> = async (event, env, rest) => {
  const embedFields: APIEmbedField[] = [
    { name: "Name", value: event.hook.name, inline: true },
    { name: "Type", value: event.hook.type, inline: true },
    { name: "Events", value: event.hook.events.join(", "), inline: true },
  ];
  await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
    body: {
      content: mentionUser(env.DISCORD_MENTION_ID),
      embeds: [
        githubEmbed({
          title: `${event.hook.type} Webhook Deleted`,
          description: "This webhook will no longer deliver events to this channel.",
          user: event.sender,
          fields: embedFields,
        }),
      ],
    } satisfies RESTPostAPIChannelMessageJSONBody,
  });
};

export default handleMeta;
