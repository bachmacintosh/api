import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleUserAuthorizationGrant: EventSubWebhookNotificationHanlder<"user.authorization.grant"> = (event) => {
  const title = `${event.user_name} Granted Authorization to App`;
  const description = `Client ID: ${event.client_id}`;
  return {
    needsMention: false,
    embed: twitchEmbed(title, description),
  };
};

export default handleUserAuthorizationGrant;
