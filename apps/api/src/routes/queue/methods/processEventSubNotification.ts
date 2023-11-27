import type { ProcessEventSubNotificationParams, QueuedEmbed } from "../../../types";
import { handleChannelRaid } from "../../../twitch";

const processEventSubNotification = (params: ProcessEventSubNotificationParams): QueuedEmbed | null => {
  switch (params.message) {
    case "notification":
      switch (params.subscriptionType) {
        case "channel.raid":
          return handleChannelRaid(params.event, params.subscription);
        case "stream.online":
          return null;
      }
      break;
    case "revocation":
      return null;
  }
};

export default processEventSubNotification;
