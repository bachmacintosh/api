import type { ProcessEventSubNotificationParams, QueuedEmbed } from "../../../types";
import { handleChannelRaid, handleRevocation } from "../../../twitch";

const processEventSubNotification = (params: ProcessEventSubNotificationParams): QueuedEmbed | null => {
  switch (params.message) {
    case "notification":
      switch (params.subscriptionType) {
        case "channel.raid":
          return handleChannelRaid(params.event, params.subscription);
        default:
          return null;
      }
    case "revocation":
      return handleRevocation(params.subscription);
  }
};

export default processEventSubNotification;
