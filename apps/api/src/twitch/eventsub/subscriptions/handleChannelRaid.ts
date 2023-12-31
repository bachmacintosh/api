import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelRaid: EventSubWebhookNotificationHanlder<"channel.raid"> = (event, subscription) => {
  if (typeof subscription?.condition.to_broadcaster_user_id !== "undefined") {
    return {
      needsMention: true,
      embed: twitchEmbed(
        `New Raid from "${event.from_broadcaster_user_name}" to "${event.to_broadcaster_user_name}"`,
        `${event.viewers} Viewers are being sent to this channel.`,
        `https://twitch.tv/${event.to_broadcaster_user_name}`,
      ),
    };
  }
  return null;
};

export default handleChannelRaid;
