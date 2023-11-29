import type { ProcessEventSubNotificationParams, QueuedEmbed } from "../../../types";
import { handleChannelBan, handleChannelRaid, handleRevocation } from "../../../twitch";

const processEventSubNotification = (params: ProcessEventSubNotificationParams): QueuedEmbed | null => {
  switch (params.message) {
    case "notification":
      switch (params.subscriptionType) {
        case "channel.ban":
          return handleChannelBan(params.event, params.subscription);
        case "channel.raid":
          return handleChannelRaid(params.event, params.subscription);
      }
      break;
    case "revocation":
      return handleRevocation(params.subscription);
  }
};

export default processEventSubNotification;
