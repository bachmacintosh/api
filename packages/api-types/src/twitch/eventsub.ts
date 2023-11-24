import type { StreamType } from "./api.js";

export type EventSubChannelRaidCondition =
  | {
      from_broadcaster_user_id: string;
    }
  | {
      to_broadcaster_user_id: string;
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

export interface EventSubSubscriptionBase<S extends EventSubSubscriptionStatus = EventSubSubscriptionStatus> {
  cost: number;
  created_at: string;
  id: string;
  status: S;
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
  subscription: EventSubWebhookSubscription<"enabled"> & {
    condition: EventSubSubscriptionConditionMap[T];
    type: T;
  };
}

export interface EventSubWebhookMessageRevocation<T extends EventSubSubscriptionType> {
  subscription: EventSubWebhookSubscription<
    "authorization_revoked" | "notification_failures_exceeded" | "user_removed" | "version_removed"
  > & {
    condition: EventSubSubscriptionConditionMap[T];
    type: T;
  };
}

export interface EventSubWebhookMessageWebhookCallbackVerification<T extends EventSubSubscriptionType> {
  challenge: string;
  subscription: EventSubWebhookSubscription<"webhook_callback_verification_pending"> & {
    condition: EventSubSubscriptionConditionMap[T];
    type: T;
  };
}

export type EventSubWebhookMessageType = "notification" | "revocation" | "webhook_callback_verification";

export interface EventSubWebhookSubscription<S extends EventSubSubscriptionStatus = EventSubSubscriptionStatus>
  extends EventSubSubscriptionBase<S> {
  transport: EventSubWebhookSubscriptionTransport;
}

export interface EventSubWebhookSubscriptionTransport {
  callback: string;
  method: "webhook";
}

export type EventSubWebSocketMessage = {
  metadata: {
    message_id: string;
    message_timestamp: string;
  };
} & (
  | {
      [T in EventSubSubscriptionType]: {
        metadata: {
          message_type: "notification";
          subscription_type: T;
          subscription_version: string;
        };
        payload: {
          event: EventSubSubscriptionEventMap[T];
          subscription: EventSubWebSocketSubscription<"enabled"> & {
            condition: EventSubSubscriptionConditionMap[T];
            type: T;
          };
        };
      };
    }[EventSubSubscriptionType]
  | {
      [T in EventSubSubscriptionType]: {
        metadata: {
          message_type: "revocation";
          subscription_type: T;
          subscription_version: string;
        };
        payload: {
          subscription: EventSubWebSocketSubscription<"authorization_revoked" | "user_removed" | "version_removed"> & {
            condition: EventSubSubscriptionConditionMap[T];
            type: T;
          };
        };
      };
    }[EventSubSubscriptionType]
  | {
      metadata: {
        message_type: "session_reconnect";
      };
      payload: {
        session: {
          connected_at: string;
          id: string;
          keepalive_timeout_seconds: null;
          reconnect_url: string;
          status: "reconnecting";
        };
      };
    }
  | {
      metadata: { message_type: "session_welcome" };
      payload: {
        session: {
          connected_at: string;
          id: string;
          keepalive_timeout_seconds: number;
          reconnect_url: null;
          status: "connected";
        };
      };
    }
  | { metadata: { message_type: "session_keepalive" }; payload: Record<string, never> }
);

export interface EventSubWebSocketSubscription<S extends EventSubSubscriptionStatus = EventSubSubscriptionStatus>
  extends EventSubSubscriptionBase<S> {
  transport: EventSubWebSocketSubscriptionTransport;
}

export interface EventSubWebSocketSubscriptionTransport {
  method: "websocket";
  session_id: string;
}