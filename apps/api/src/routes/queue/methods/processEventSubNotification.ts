import type { ProcessEventSubNotificationParams, QueuedEmbed } from "../../../types";
import {
  handleChannelBan,
  handleChannelChatClear,
  handleChannelChatClearUserMessages,
  handleChannelChatMessageDelete,
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
        case "channel.chat.clear":
          return handleChannelChatClear(params.event);
        case "channel.chat.message_delete":
          return handleChannelChatMessageDelete(params.event);
        case "channel.raid":
          return handleChannelRaid(params.event, params.subscription);
      }
      break;
    case "revocation":
      return handleRevocation(params.subscription);
  }
};

export default processEventSubNotification;
