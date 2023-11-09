import {
  type APIEmbedField,
  type GitHubWebhookEventRunner,
  type RESTPostAPIChannelMessageJSONBody,
  Routes,
} from "../../types";
import resultEmbed from "../../discord/embeds/resultEmbed";

const handlePing: GitHubWebhookEventRunner<"ping"> = async (event, env, rest) => {
  const embedFields: APIEmbedField[] = [{ name: "Name", value: event.hook.name }];
  if (event.hook.type === "Organization" && typeof event.organization !== "undefined") {
    embedFields.push({ name: "Organization", value: event.organization.login });
  } else if (event.hook.type === "Repository" && typeof event.repository !== "undefined") {
    if (typeof event.organization !== "undefined") {
      embedFields.push({ name: "Organization", value: event.organization.login });
      embedFields.push({ name: "Repository", value: event.repository.name });
    } else if (typeof event.sender !== "undefined") {
      embedFields.push({ name: "User", value: event.sender.login });
      embedFields.push({ name: "Repository", value: event.repository.name });
    }
  }
  embedFields.push({ name: "Events", value: event.hook.events.join(", ") });
  await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
    body: {
      embeds: [
        resultEmbed(
          "success",
          `New ${event.hook.type} Webhook Ping`,
          "GitHub sent a Ping from a Webhook, usually when a new one was added.",
          embedFields,
        ),
      ],
    } satisfies RESTPostAPIChannelMessageJSONBody,
  });
};

export default handlePing;
