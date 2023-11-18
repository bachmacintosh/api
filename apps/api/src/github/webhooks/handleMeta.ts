import type { APIEmbedField, GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleMeta: GitHubWebhookEventRunner<"meta"> = (event) => {
  const embedFields: APIEmbedField[] = [
    { name: "Name", value: event.hook.name, inline: true },
    { name: "Type", value: event.hook.type, inline: true },
    { name: "Events", value: event.hook.events.join(", "), inline: true },
  ];
  return {
    needsMention: true,
    embed: githubEmbed({
      title: `${event.hook.type} Webhook Deleted`,
      description: "This webhook will no longer deliver events to this channel.",
      user: event.sender,
      fields: embedFields,
    }),
  };
};

export default handleMeta;
