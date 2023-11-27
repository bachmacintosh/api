import type { StreamType } from "./api.js";

export type EventSubChannelRaidCondition =
  | {
      from_broadcaster_user_id: string;
      to_broadcaster_user_id?: never;
    }
  | {
      to_broadcaster_user_id: string;
      from_broadcaster_user_id?: never;
    };

export interface EventSubChannelRaidEvent {
  from_broadcaster_user_id: string;
  from_broadcaster_user_login: string;
  from_broadcaster_user_name: string;
  to_broadcaster_user_id: string;
  to_broadcaster_user_login: string;
  to_broadcaster_user_name: string;
  viewers: number;
}

export interface EventSubStreamOfflineCondition {
  broadcaster_user_id: string;
}

export interface EventSubStreamOfflineEvent {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
}

export interface EventSubStreamOnlineCondition {
  broadcaster_user_id: string;
}

export interface EventSubStreamOnlineEvent {
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  id: string;
  started_at: string;
  type: StreamType;
}

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
  version: string;
}

export interface EventSubSubscriptionConditionMap {
  "channel.raid": EventSubChannelRaidCondition;
  "stream.offline": EventSubStreamOfflineCondition;
  "stream.online": EventSubStreamOnlineCondition;
}

export interface EventSubSubscriptionEventMap {
  "channel.raid": EventSubChannelRaidEvent;
  "stream.offline": EventSubStreamOfflineEvent;
  "stream.online": EventSubStreamOnlineEvent;
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

export type EventSubSubscriptionType = "channel.raid" | "stream.offline" | "stream.online";

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
