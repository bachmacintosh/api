import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelChatClearUserMessages: EventSubWebhookNotificationHanlder<"channel.chat.clear_user_messages"> = (
  event,
) => {
  const title = `Chat Messages Cleared for User ${event.target_user_name}`;
  const description = "The messages were likely cleared as part of a ban or timeout.";
  return {
    needsMention: false,
    embed: twitchEmbed(title, description),
  };
};

export default handleChannelChatClearUserMessages;
