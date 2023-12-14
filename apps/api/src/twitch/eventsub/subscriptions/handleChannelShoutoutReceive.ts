import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelShoutoutReceive: EventSubWebhookNotificationHanlder<"channel.shoutout.receive"> = (event) => {
  const title = `${event.broadcaster_user_name} Shouted Out by ${event.from_broadcaster_user_name}`;
  const description = `${event.viewer_count} Viewers saw the Shoutout`;

  return {
    needsMention: true,
    embed: twitchEmbed(title, description),
  };
};

export default handleChannelShoutoutReceive;
