import type { EventSubWebhookNotificationHanlder } from "../../../types";
import twitchEmbed from "../../../discord/embeds/twitchEmbed";

const handleUserAuthorizationRevoke: EventSubWebhookNotificationHanlder<"user.authorization.revoke"> = (event) => {
  const title = `${event.user_name} Granted Authorization to App`;
  const description = `Client ID ${event.client_id} no longer has access to this account.`;
  return {
    needsMention: true,
    embed: twitchEmbed(title, description),
  };
};

export default handleUserAuthorizationRevoke;
