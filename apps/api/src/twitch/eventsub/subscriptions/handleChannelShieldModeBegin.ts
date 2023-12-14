import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelShieldModeBegin: EventSubWebhookNotificationHanlder<"channel.shield_mode.begin"> = (event) => {
  const broadcasterOrModerator = event.moderator_user_id === event.broadcaster_user_id ? "Broadcaster" : "Moderator";
  const title = `Shield Mode Enabled for ${event.broadcaster_user_name}'s Chat`;
  const description = `Enabled by ${broadcasterOrModerator} ${event.moderator_user_name}`;
  return {
    needsMention: false,
    embed: twitchEmbed(title, description),
  };
};

export default handleChannelShieldModeBegin;
