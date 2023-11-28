import type { StreamType } from "./api.js";

// Conditions and Events

export interface EventSubChannelBanV1Condition {
  broadcaster_user_id: string;
}

export type EventSubChannelBanV1Event = {
  banned_at: string;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  moderator_user_id: string;
  moderator_user_login: string;
  moderator_user_name: string;
  reason: string;
  user_id: string;
  user_login: string;
  user_name: string;
} & ({ ends_at: null; is_permanent: true } | { ends_at: string; is_permanent: false });

export interface EventSubChannelChatClearV1Condition {
  broadcaster_user_id: string;
  user_id: string;
}

export interface EventSubChannelChatClearV1Event {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
}

export interface EventSubChannelChatClearUserMessagesV1Condition {
  broadcaster_user_id: string;
  user_id: string;
}

export interface EventSubChannelChatClearUserMessagesV1Event {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  target_user_id: string;
  target_user_login: string;
  target_user_name: string;
}

export interface EventSubChannelChatMessageDeleteV1Condition {
  broadcaster_user_id: string;
  user_id: string;
}

export interface EventSubChannelChatMessageDeleteV1Event {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  message_id: string;
  target_user_id: string;
  target_user_login: string;
  target_user_name: string;
}

export type EventSubChannelRaidV1Condition =
  | {
      from_broadcaster_user_id: string;
      to_broadcaster_user_id?: never;
    }
  | {
      to_broadcaster_user_id: string;
      from_broadcaster_user_id?: never;
    };

export interface EventSubChannelRaidV1Event {
  from_broadcaster_user_id: string;
  from_broadcaster_user_login: string;
  from_broadcaster_user_name: string;
  to_broadcaster_user_id: string;
  to_broadcaster_user_login: string;
  to_broadcaster_user_name: string;
  viewers: number;
}

export interface EventSubChannelShieldModeBeginV1Condition {
  broadcaster_user_id: string;
  moderator_user_id: string;
}

export interface EventSubChannelShieldModeBeginV1Event {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  moderator_user_id: string;
  moderator_user_login: string;
  moderator_user_name: string;
  started_at: string;
}

export interface EventSubChannelShieldModeEndV1Condition {
  broadcaster_user_id: string;
  moderator_user_id: string;
}

export interface EventSubChannelShieldModeEndV1Event {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  ended_at: string;
  moderator_user_id: string;
  moderator_user_login: string;
  moderator_user_name: string;
}

export interface EventSubChannelShoutoutCreateV1Condition {
  broadcaster_user_id: string;
  moderator_user_id: string;
}

export interface EventSubChannelShoutoutCreateV1Event {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  cooldown_ends_at: string;
  moderator_user_id: string;
  moderator_user_login: string;
  moderator_user_name: string;
  started_at: string;
  target_cooldown_ends_at: string;
  to_broadcaster_user_id: string;
  to_broadcaster_user_login: string;
  to_broadcaster_user_name: string;
  viewer_count: number;
}

export interface EventSubChannelShoutoutReceiveV1Condition {
  broadcaster_user_id: string;
  moderator_user_id: string;
}

export interface EventSubChannelShoutoutReceiveV1Event {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  from_broadcaster_user_id: string;
  from_broadcaster_user_login: string;
  from_broadcaster_user_name: string;
  started_at: string;
  viewer_count: number;
}

export interface EventSubChannelUnbanV1Condition {
  broadcaster_user_id: string;
}

export interface EventSubChannelUnbanV1Event {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  moderator_user_id: string;
  moderator_user_login: string;
  moderator_user_name: string;
  user_id: string;
  user_login: string;
  user_name: string;
}

export interface EventSubStreamOnlineV1Condition {
  broadcaster_user_id: string;
}

export interface EventSubStreamOnlineV1Event {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  id: string;
  started_at: string;
  type: StreamType;
}

export interface EventSubUserAuthorizationGrantV1Condition {
  client_id: string;
}

export interface EventSubUserAuthorizationGrantV1Event {
  client_id: string;
  user_id: string;
  user_login: string;
  user_name: string;
}

export interface EventSubUserAuthorizationRevokeV1Condition {
  client_id: string;
}

export interface EventSubUserAuthorizationRevokeV1Event {
  client_id: string;
  user_id: string;
  user_login: string | null;
  user_name: string | null;
}

export interface EventSubUserUpdateV1Condition {
  user_id: string;
}

export interface EventSubUserUpdateV1Event {
  description: string;
  email: string;
  email_verified: boolean;
  user_id: string;
  user_login: string;
  user_name: string;
}

// Subscriptions

export interface EventSubSubscriptionBase<
  T extends EventSubSubscriptionType,
  S extends EventSubSubscriptionStatus = EventSubSubscriptionStatus,
> {
  condition: EventSubSubscriptionConditionMap[T];
  cost: number;
  created_at: string;
  id: string;
  status: S;
  type: T;
  version: EventSubSubscriptionVersionMap[T];
}

export interface EventSubSubscriptionConditionMap {
  "channel.ban": EventSubChannelBanV1Condition;
  "channel.chat.clear": EventSubChannelChatClearV1Condition;
  "channel.chat.clear_user_messages": EventSubChannelChatClearUserMessagesV1Condition;
  "channel.chat.message_delete": EventSubChannelChatMessageDeleteV1Condition;
  "channel.raid": EventSubChannelRaidV1Condition;
  "channel.shield_mode.begin": EventSubChannelShieldModeBeginV1Condition;
  "channel.shield_mode.end": EventSubChannelShieldModeEndV1Condition;
  "channel.shoutout.create": EventSubChannelShoutoutCreateV1Condition;
  "channel.shoutout.receive": EventSubChannelShoutoutReceiveV1Condition;
  "channel.unban": EventSubChannelUnbanV1Condition;
  "stream.online": EventSubStreamOnlineV1Condition;
  "user.authorization.grant": EventSubUserAuthorizationGrantV1Condition;
  "user.authorization.revoke": EventSubUserAuthorizationRevokeV1Condition;
  "user.update": EventSubUserUpdateV1Condition;
}

export interface EventSubSubscriptionEventMap {
  "channel.ban": EventSubChannelBanV1Event;
  "channel.chat.clear": EventSubChannelChatClearV1Event;
  "channel.chat.clear_user_messages": EventSubChannelChatClearUserMessagesV1Event;
  "channel.chat.message_delete": EventSubChannelChatMessageDeleteV1Event;
  "channel.raid": EventSubChannelRaidV1Event;
  "channel.shield_mode.begin": EventSubChannelShieldModeBeginV1Event;
  "channel.shield_mode.end": EventSubChannelShieldModeEndV1Event;
  "channel.shoutout.create": EventSubChannelShoutoutCreateV1Event;
  "channel.shoutout.receive": EventSubChannelShoutoutReceiveV1Event;
  "channel.unban": EventSubChannelUnbanV1Event;
  "stream.online": EventSubStreamOnlineV1Event;
  "user.authorization.grant": EventSubUserAuthorizationGrantV1Event;
  "user.authorization.revoke": EventSubUserAuthorizationRevokeV1Event;
  "user.update": EventSubUserUpdateV1Event;
}

export type EventSubSubscriptionStatus =
  | "authorization_revoked"
  | "enabled"
  | "moderator_removed"
  | "notification_failures_exceeded"
  | "user_removed"
  | "version_removed"
  | "webhook_callback_verification_failed"
  | "webhook_callback_verification_pending"
  | "websocket_connection_unused"
  | "websocket_disconnected"
  | "websocket_failed_ping_pong"
  | "websocket_internal_error"
  | "websocket_network_error"
  | "websocket_network_timeout"
  | "websocket_received_inbound_traffic";

export type EventSubSubscriptionTransport =
  | {
      callback: string;
      method: "webhook";
      secret: string;
    }
  | {
      connected_at: string;
      disconnected_at: string;
      method: "websocket";
      session_id: string;
    };

export type EventSubSubscriptionType =
  | "channel.ban"
  | "channel.chat.clear_user_messages"
  | "channel.chat.clear"
  | "channel.chat.message_delete"
  /* TODO: Add the following subscription types after they leave Beta
     | "channel.guest_star_guest.update"
     | "channel.guest_star_session.begin"
     | "channel.guest_star_session.end"
     | "channel.guest_star_settings.update" */
  | "channel.raid"
  | "channel.shield_mode.begin"
  | "channel.shield_mode.end"
  | "channel.shoutout.create"
  | "channel.shoutout.receive"
  | "channel.unban"
  | "stream.online"
  | "user.authorization.grant"
  | "user.authorization.revoke"
  | "user.update";

export interface EventSubSubscriptionVersionMap {
  "channel.ban": "1";
  "channel.chat.clear": "1";
  "channel.chat.clear_user_messages": "1";
  "channel.chat.message_delete": "1";
  "channel.raid": "1";
  "channel.shield_mode.begin": "1";
  "channel.shield_mode.end": "1";
  "channel.shoutout.create": "1";
  "channel.shoutout.receive": "1";
  "channel.unban": "1";
  "stream.online": "1";
  "user.authorization.grant": "1";
  "user.authorization.revoke": "1";
  "user.update": "1";
}

// Webhooks

export interface EventSubWebhookMessageNotification<T extends EventSubSubscriptionType> {
  event: EventSubSubscriptionEventMap[T];
  subscription: EventSubWebhookSubscription<T, "enabled">;
}

export interface EventSubWebhookMessageRevocation<T extends EventSubSubscriptionType> {
  subscription: EventSubWebhookSubscription<
    T,
    "authorization_revoked" | "notification_failures_exceeded" | "user_removed" | "version_removed"
  >;
}

export interface EventSubWebhookMessageWebhookCallbackVerification<T extends EventSubSubscriptionType> {
  challenge: string;
  subscription: EventSubWebhookSubscription<T, "webhook_callback_verification_pending">;
}

export type EventSubWebhookMessageType = "notification" | "revocation" | "webhook_callback_verification";

export interface EventSubWebhookSubscription<
  T extends EventSubSubscriptionType,
  S extends EventSubSubscriptionStatus = EventSubSubscriptionStatus,
> extends EventSubSubscriptionBase<T, S> {
  transport: EventSubWebhookSubscriptionTransport;
}

export interface EventSubWebhookSubscriptionTransport {
  callback: string;
  method: "webhook";
}

// WebSockets

export interface EventSubWebSocketMessage<
  M extends EventSubWebSocketMessageType,
  T extends EventSubSubscriptionType | undefined = undefined,
> {
  metadata: M extends "notification" | "revocation"
    ? EventSubWebSocketMetadata<M, T>
    : EventSubWebSocketMetadataBase<M>;
  payload: EventSubWebSocketPayloadMap<T>[M];
}

export function isEventSubWebSocketMessage<
  M extends EventSubWebSocketMessageType,
  T extends EventSubSubscriptionType | undefined = undefined,
>(value: unknown, messageType: M, subscriptionType?: T): value is EventSubWebSocketMessage<M, T> {
  if (typeof subscriptionType === "undefined") {
    if (messageType === "notification" || messageType === "revocation") {
      throw new TypeError(`EventSub messages of type "${messageType}" must have a subscription attached to them.`);
    }
    return (
      typeof value === "object" &&
      value !== null &&
      "metadata" in value &&
      typeof value.metadata === "object" &&
      value.metadata !== null &&
      "message_type" in value.metadata &&
      typeof value.metadata.message_type === "string" &&
      value.metadata.message_type === messageType
    );
  } else if (messageType !== "notification" && messageType !== "revocation") {
    throw new TypeError(`EventSub messages of type "${messageType} cannot have a subscription attached to them.`);
  } else {
    return (
      typeof value === "object" &&
      value !== null &&
      "metadata" in value &&
      typeof value.metadata === "object" &&
      value.metadata !== null &&
      "message_type" in value.metadata &&
      typeof value.metadata.message_type === "string" &&
      value.metadata.message_type === messageType &&
      "subscription_type" in value.metadata &&
      typeof value.metadata.subscription_type === "string" &&
      value.metadata.subscription_type === subscriptionType
    );
  }
}

export type EventSubWebSocketMessageType =
  | "notification"
  | "revocation"
  | "session_keepalive"
  | "session_reconnect"
  | "session_welcome";

export type EventSubWebSocketMetadata<
  M extends EventSubWebSocketMessageType,
  T extends EventSubSubscriptionType | undefined = undefined,
> = T extends EventSubSubscriptionType
  ? EventSubWebSocketMetadataBase<M> & {
      subscription_type: T;
      subscription_version: string;
    }
  : never;

export interface EventSubWebSocketMetadataBase<M extends EventSubWebSocketMessageType> {
  message_id: string;
  message_timestamp: string;
  message_type: M;
}

export interface EventSubWebSocketPayloadMap<T extends EventSubSubscriptionType | undefined = undefined> {
  notification: T extends EventSubSubscriptionType
    ? {
        event: EventSubSubscriptionEventMap[T];
        subscription: EventSubWebSocketSubscription<T, "enabled">;
      }
    : never;
  revocation: T extends EventSubSubscriptionType
    ? {
        subscription: EventSubWebSocketSubscription<T, "authorization_revoked" | "user_removed" | "version_removed">;
      }
    : never;
  session_keepalive: T extends undefined ? Record<string, never> : never;
  session_reconnect: T extends undefined
    ? {
        session: {
          connected_at: string;
          id: string;
          keepalive_timeout_seconds: null;
          reconnect_url: string;
          status: "reconnecting";
        };
      }
    : never;
  session_welcome: T extends undefined
    ? {
        session: {
          connected_at: string;
          id: string;
          keepalive_timeout_seconds: number;
          reconnect_url: null;
          status: "connected";
        };
      }
    : never;
}

export interface EventSubWebSocketSubscription<
  T extends EventSubSubscriptionType,
  S extends EventSubSubscriptionStatus = EventSubSubscriptionStatus,
> extends EventSubSubscriptionBase<T, S> {
  transport: EventSubWebSocketSubscriptionTransport;
}

export interface EventSubWebSocketSubscriptionTransport {
  method: "websocket";
  session_id: string;
}
