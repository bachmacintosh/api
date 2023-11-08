import type { AcState, SensiboConfig } from "./sensibo";
import type { SteamMonitorConfig, SteamUserInfo } from "./steam";

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

  QUEUE: Queue<QueueBody<keyof QueueMethods>>;

  SENSIBO_API_KEY: string;

  STEAM_API_KEY: string;
  STEAM_ID: string;

  TOMORROW_API_KEY: string;
  TOMORROW_LOCATION_ID: string;

  WORKER_ENV: string;
}

export interface KVMap {
  config_sensibo: SensiboConfig;
  config_steam: SteamMonitorConfig;
  steam_user_info: SteamUserInfo | null;
}

export interface QueueMethods {
  setAcState: {
    acState: Partial<AcState>;
    interactionToken: string;
    podId: string;
  };
}
export interface QueueBody<K extends keyof QueueMethods> {
  method: K;
  params: QueueMethods[K];
}
