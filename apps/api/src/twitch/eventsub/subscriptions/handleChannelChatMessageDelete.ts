import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelChatMessageDelete: EventSubWebhookNotificationHanlder<"channel.chat.message_delete"> = (event) => {
  const title = `Message Deleted from ${event.broadcaster_user_name}'s Chat`;
  const description = `Message ID: ${event.message_id} - by ${event.target_user_name}`;
  return {
    needsMention: false,
    embed: twitchEmbed(title, description),
  };
};

export default handleChannelChatMessageDelete;
