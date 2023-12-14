import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleStreamOnline: EventSubWebhookNotificationHanlder<"stream.online"> = (event) => {
  const title = `${event.broadcaster_user_name}'s Stream is Now Live`;
  const description = `A ${event.type} stream has started.`;
  const url = `https://twitch.tv/${event.broadcaster_user_login}`;
  return {
    needsMention: true,
    embed: twitchEmbed(title, description, url),
  };
};

export default handleStreamOnline;
