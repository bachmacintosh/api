import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelShoutoutCreate: EventSubWebhookNotificationHanlder<"channel.shoutout.create"> = (event) => {
  const broadcasterOrModerator = event.moderator_user_id === event.broadcaster_user_id ? "Broadcaster" : "Moderator";
  const title = `Shoutout to ${event.to_broadcaster_user_name} in ${event.broadcaster_user_name}'s Chat`;
  const description = `Given by ${broadcasterOrModerator} ${event.moderator_user_name} to ${event.viewer_count} Viewers`;

  return {
    needsMention: false,
    embed: twitchEmbed(title, description),
  };
};

export default handleChannelShoutoutCreate;
