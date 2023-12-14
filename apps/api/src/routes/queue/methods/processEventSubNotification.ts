import type { ProcessEventSubNotificationParams, QueuedEmbed } from "../../../types";
import {
  handleChannelBan,
  handleChannelChatClear,
  handleChannelChatClearUserMessages,
  handleChannelChatMessageDelete,
  handleChannelRaid,
  handleChannelShieldModeBegin,
  handleChannelShieldModeEnd,
  handleChannelShoutoutCreate,
  handleChannelShoutoutReceive,
  handleChannelUnban,
  handleRevocation,
  handleStreamOnline,
  handleUserAuthorizationGrant,
  handleUserAuthorizationRevoke,
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
        case "channel.shield_mode.begin":
          return handleChannelShieldModeBegin(params.event);
        case "channel.shield_mode.end":
          return handleChannelShieldModeEnd(params.event);
        case "channel.shoutout.create":
          return handleChannelShoutoutCreate(params.event);
        case "channel.shoutout.receive":
          return handleChannelShoutoutReceive(params.event);
        case "channel.unban":
          return handleChannelUnban(params.event);
        case "stream.online":
          return handleStreamOnline(params.event);
        case "user.authorization.grant":
          return handleUserAuthorizationGrant(params.event);
        case "user.authorization.revoke":
          return handleUserAuthorizationRevoke(params.event);
      }
      break;
    case "revocation":
      return handleRevocation(params.subscription);
  }
};

export default processEventSubNotification;
