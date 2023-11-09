import {
  type APIEmbedField,
  type GitHubWebhookEventRunner,
  type RESTPostAPIChannelMessageJSONBody,
  Routes,
} from "../../types";
import resultEmbed from "../../discord/embeds/resultEmbed";

const handlePing: GitHubWebhookEventRunner<"ping"> = async (pingEvent, env, rest) => {
  const embedFields: APIEmbedField[] = [{ name: "Name", value: pingEvent.hook.name }];
  if (pingEvent.hook.type === "Organization" && typeof pingEvent.organization !== "undefined") {
    embedFields.push({ name: "Organization", value: pingEvent.organization.login });
  } else if (pingEvent.hook.type === "Repository" && typeof pingEvent.repository !== "undefined") {
    if (typeof pingEvent.sender !== "undefined") {
      embedFields.push({ name: "User", value: pingEvent.sender.login });
      embedFields.push({ name: "Repository", value: pingEvent.repository.name });
    } else if (typeof pingEvent.organization !== "undefined") {
      embedFields.push({ name: "Organization", value: pingEvent.organization.login });
      embedFields.push({ name: "Repository", value: pingEvent.repository.name });
    }
  }
  embedFields.push({ name: "Events", value: pingEvent.hook.events.join(", ") });
  await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
    body: {
      embeds: [
        resultEmbed(
          "success",
          `New ${pingEvent.hook.type} Webhook Ping`,
          "GitHub sent a Ping from a Webhook, usually when a new one was added.",
          embedFields,
        ),
      ],
    } satisfies RESTPostAPIChannelMessageJSONBody,
  });
};

export default handlePing;
