import type { EventSubRevocationHandler } from "../../types";
import twitchEmbed from "../../discord/embeds/twitchEmbed";

const handleRevocation: EventSubRevocationHandler = (subscription) => {
  const title = "Twitch EventSub Subscription Revoked";
  let description = "";
  switch (subscription.status) {
    case "authorization_revoked":
      description = "The user revoked authorization; reasons include changing their password or deleting the app.";
      break;
    case "moderator_removed":
      description = "The moderator tied to this subscription is no longer a moderator for the subscribed channel.";
      break;
    case "notification_failures_exceeded":
      description =
        "The Webhook has failed too many times or taken too long to respond, so Twitch has revoked the subscription.";
      break;
    case "user_removed":
      description =
        "The user no longer exists on Twitch; either they deleted their account, or were banned indefinitely.";
      break;
    case "version_removed":
      description = `Version ${subscription.version} of the "${subscription.type}" event has been removed.`;
      break;
  }
  return {
    needsMention: true,
    embed: twitchEmbed(title, description),
  };
};

export default handleRevocation;
