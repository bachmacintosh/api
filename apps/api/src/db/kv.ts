import type { Env, KVMap, SensiboConfig, SteamMonitorConfig } from "../types";

export async function get<K extends keyof KVMap>(env: Env, key: K): Promise<KVMap[K]> {
  const kvValue = await env.KV.get<KVMap[K]>(key, "json");
  if (kvValue === null) {
    switch (key) {
      case "config_sensibo": {
        const cutoffHour = 8;
        const defaultConfig: SensiboConfig = {
          cutoffHour,
        };
        await env.KV.put(key, JSON.stringify(defaultConfig));
        return defaultConfig as KVMap[K];
      }
      case "config_steam": {
        const defaultConfig: SteamMonitorConfig = {
          status: "stopped",
        };
        await env.KV.put(key, JSON.stringify(defaultConfig));
        return defaultConfig as KVMap[K];
      }
      case "steam_user_info": {
        return null as KVMap[K];
      }
      default: {
        throw new Error("Unknown key specified");
      }
    }
  } else {
    return kvValue;
  }
}

export async function set<K extends keyof KVMap>(env: Env, key: K, value: KVMap[K]): Promise<void> {
  await env.KV.put(key, JSON.stringify(value));
}
