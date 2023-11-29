import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelBan: EventSubWebhookNotificationHanlder<"channel.ban"> = (event) => {
  const bannedOrTimedOut = event.is_permanent ? "Banned" : "Timed Out";
  const broadcasterOrModerator = event.moderator_user_id === event.broadcaster_user_id ? "Broadcaster" : "Moderator";
  const title = `User ${event.user_name} ${bannedOrTimedOut} by ${broadcasterOrModerator} ${event.moderator_user_name}`;
  const description = `${bannedOrTimedOut} for: ${event.reason} -- ${
    event.is_permanent ? "Ban is Permanent" : `Timeout Expires at ${event.ends_at}`
  }`;
  return {
    needsMention: false,
    embed: twitchEmbed(title, description),
  };
};

export default handleChannelBan;
