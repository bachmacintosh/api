import type { AcState, SensiboConfig } from "./sensibo";
import type {
  EventSubSubscriptionConditionMap,
  EventSubSubscriptionEventMap,
  EventSubSubscriptionType,
  EventSubWebhookSubscription,
} from "@bachmacintosh/api-types";
import type { SteamMonitorConfig, SteamUserInfo } from "./steam";
import type { WebhookEventMap, WebhookEventName } from "./github";

export type CF = [env: Env, context: ExecutionContext];

export interface Env {
  DB: D1Database;

  DISCORD_BOT_CLIENT_ID: string;
  DISCORD_BOT_PUBLIC_KEY: string;
  DISCORD_BOT_TOKEN: string;
  DISCORD_CHANNEL_GITHUB: string;
  DISCORD_CHANNEL_SENSIBO: string;
  DISCORD_CHANNEL_STEAM: string;
  DISCORD_GUILD_ID: string;
  DISCORD_MENTION_ID: string;

  GITHUB_ACCESS_TOKEN: string;
  GITHUB_WEBHOOK_SECRET: string;

  KV: KVNamespace;

  QUEUE: Queue<QueueBody>;

  SENSIBO_API_KEY: string;

  STEAM_API_KEY: string;
  STEAM_ID: string;

  TOMORROW_API_KEY: string;
  TOMORROW_LOCATION_ID: string;

  TWITCH_EVENTSUB_SECRET: string;

  WORKER_ENV: string;
}

export interface KVMap {
  config_sensibo: SensiboConfig;
  config_steam: SteamMonitorConfig;
  steam_user_info: SteamUserInfo | null;
}

export type ProcessGitHubWebhookParams = {
  [K in WebhookEventName]: {
    event: K;
    payload: WebhookEventMap[K];
  };
}[WebhookEventName];

export type ProcessTwitchEventSubParams = {
  [T in EventSubSubscriptionType]:
    | {
        condition: EventSubSubscriptionConditionMap[T];
        event: EventSubSubscriptionEventMap[T];
        message: "notification";
        subscription: EventSubWebhookSubscription<"enabled"> & {
          condition: EventSubSubscriptionConditionMap[T];
          type: T;
        };
        subscriptionType: T;
      }
    | {
        condition: EventSubSubscriptionConditionMap[T];
        message: "revocation";
        subscription: EventSubWebhookSubscription<
          "authorization_revoked" | "notification_failures_exceeded" | "user_removed" | "version_removed"
        > & {
          condition: EventSubSubscriptionConditionMap[T];
          type: T;
        };
        subscriptionType: T;
      };
}[EventSubSubscriptionType];

export type QueueBody = {
  [K in keyof QueueMethods]: {
    method: K;
    params: QueueMethods[K];
  };
}[keyof QueueMethods];

export interface QueueMethods {
  processGitHubWebhook: ProcessGitHubWebhookParams;
  processTwitchEventSub: ProcessTwitchEventSubParams;
  setAcState: {
    acState: Partial<AcState>;
    interactionToken: string;
    podId: string;
  };
}
