import type { StreamType } from "./api.js";

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

export interface EventSubSubscriptionConditionMap {
  "stream.offline": EventSubStreamOfflineCondition;
  "stream.online": EventSubStreamOnlineCondition;
}

export interface EventSubSubscriptionEventMap {
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

export type EventSubSubscriptionStatusPick<K extends EventSubSubscriptionStatus> = K;

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

export type EventSubSubscriptionType = "stream.offline" | "stream.online";

export type EventSubWebhookMessageNotification = {
  [T in EventSubSubscriptionType]: {
    event: EventSubSubscriptionEventMap[T];
    subscription: {
      condition: EventSubSubscriptionConditionMap[T];
      type: T;
    };
  };
}[EventSubSubscriptionType] & {
  subscription: EventSubSubscriptionBase<"enabled">;
};

export type EventSubWebhookMessageRevocation = {
  [T in EventSubSubscriptionType]: {
    subscription: {
      condition: EventSubSubscriptionConditionMap[T];
      type: T;
    };
  };
}[EventSubSubscriptionType] & {
  subscription: EventSubSubscriptionBase<
    "authorization_revoked" | "notification_failures_exceeded" | "user_removed" | "version_removed"
  >;
};

export type EventSubWebhookMessageWebhookCallbackVerification = {
  [T in EventSubSubscriptionType]: {
    subscription: {
      condition: EventSubSubscriptionConditionMap[T];
      type: T;
    };
  };
}[EventSubSubscriptionType] & {
  challenge: string;
  subscription: EventSubSubscriptionBase<"webhook_callback_verification_pending">;
};

export type EventSubWebhookMessageType = "notification" | "revocation" | "webhook_callback_verification";

export interface EventSubSubscriptionBase<S extends EventSubSubscriptionStatus = EventSubSubscriptionStatus> {
  cost: number;
  created_at: string;
  id: string;
  status: S;
  transport: EventSubWebhookSubscriptionTransport;
  version: string;
}

export interface EventSubWebhookSubscriptionTransport {
  callback: string;
  method: "webhook";
}
