import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelUnban: EventSubWebhookNotificationHanlder<"channel.unban"> = (event) => {
  const broadcasterOrModerator = event.moderator_user_id === event.broadcaster_user_id ? "Broadcaster" : "Moderator";
  const title = `User ${event.user_name} Unbanned by ${broadcasterOrModerator} ${event.moderator_user_name}`;
  const description = "User can now interact with stream again.";
  return {
    needsMention: true,
    embed: twitchEmbed(title, description),
  };
};

export default handleChannelUnban;
