import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelShieldModeEnd: EventSubWebhookNotificationHanlder<"channel.shield_mode.end"> = (event) => {
  const broadcasterOrModerator = event.moderator_user_id === event.broadcaster_user_id ? "Broadcaster" : "Moderator";
  const title = `Shield Mode Disabled for ${event.broadcaster_user_name}'s Chat`;
  const description = `Disabled by ${broadcasterOrModerator} ${event.moderator_user_name}`;
  return {
    needsMention: true,
    embed: twitchEmbed(title, description),
  };
};

export default handleChannelShieldModeEnd;
