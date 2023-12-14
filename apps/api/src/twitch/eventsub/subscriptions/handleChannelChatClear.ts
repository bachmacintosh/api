import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelChatClear: EventSubWebhookNotificationHanlder<"channel.chat.clear"> = (event) => {
  const title = `${event.broadcaster_user_name}'s Chat Cleared`;
  const description = "The entire chat was cleared of messages.";
  return {
    needsMention: false,
    embed: twitchEmbed(title, description),
  };
};

export default handleChannelChatClear;
