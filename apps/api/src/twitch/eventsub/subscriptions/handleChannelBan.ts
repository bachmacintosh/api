import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleChannelBan: EventSubWebhookNotificationHanlder<"channel.ban"> = (event) => {
  let moderatorOrBroadcaster = "Moderator";
  if (event.moderator_user_id === event.broadcaster_user_id) {
    moderatorOrBroadcaster = "Broadcaster";
  }
  const title = `User ${event.user_login} Banned by ${moderatorOrBroadcaster} ${event.moderator_user_login}`;
  const description = `Banned for: ${event.reason} -- ${
    event.is_permanent ? "Ban is Permanent" : `Ban Expires at ${event.ends_at}`
  }`;
  return {
    needsMention: false,
    embed: twitchEmbed(title, description),
  };
};

export default handleChannelBan;
