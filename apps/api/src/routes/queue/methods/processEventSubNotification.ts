import type { ProcessEventSubNotificationParams, QueuedEmbed } from "../../../types";
import {
  handleChannelBan,
  handleChannelChatClearUserMessages,
  handleChannelRaid,
  handleRevocation,
} from "../../../twitch";

const processEventSubNotification = (params: ProcessEventSubNotificationParams): QueuedEmbed | null => {
  switch (params.message) {
    case "notification":
      switch (params.subscriptionType) {
        case "channel.ban":
          return handleChannelBan(params.event);
        case "channel.chat.clear_user_messages":
          return handleChannelChatClearUserMessages(params.event);
        case "channel.raid":
          return handleChannelRaid(params.event);
      }
      break;
    case "revocation":
      return handleRevocation(params.subscription);
  }
};

export default processEventSubNotification;
