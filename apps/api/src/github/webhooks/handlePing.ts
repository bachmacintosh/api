import {
  type APIEmbedField,
  type GitHubWebhookEventRunner,
  type RESTPostAPIChannelMessageJSONBody,
  Routes,
} from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handlePing: GitHubWebhookEventRunner<"ping"> = async (event, env, rest) => {
  if (typeof event.hook === "undefined") {
    await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
      body: {
        embeds: [
          githubEmbed({
            title: "Webhook Ping with Missing Hook",
            description: "GitHub has sent a ping, but did not include info about the webhook.",
            level: "error",
            user: event.sender,
          }),
        ],
      } satisfies RESTPostAPIChannelMessageJSONBody,
    });
  } else {
    const embedFields: APIEmbedField[] = [{ name: "Name", value: event.hook.name, inline: true }];
    if (event.hook.type === "Organization" && typeof event.organization !== "undefined") {
      embedFields.push({ name: "Organization", value: event.organization.login, inline: true });
    } else if (event.hook.type === "Repository" && typeof event.repository !== "undefined") {
      if (typeof event.organization !== "undefined") {
        embedFields.push({ name: "Organization", value: event.organization.login, inline: true });
        embedFields.push({ name: "Repository", value: event.repository.name, inline: true });
      } else if (typeof event.sender !== "undefined") {
        embedFields.push({ name: "User", value: event.sender.login, inline: true });
        embedFields.push({ name: "Repository", value: event.repository.name, inline: true });
      }
    }
    embedFields.push({ name: "Events", value: event.hook.events.join(", ") });
    await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
      body: {
        embeds: [
          githubEmbed({
            title: `New ${event.hook.type} Webhook Ping`,
            description: "Its events will now be delivered to this channel.",
            fields: embedFields,
            level: "success",
            user: event.sender,
          }),
        ],
      } satisfies RESTPostAPIChannelMessageJSONBody,
    });
  }
};

export default handlePing;
