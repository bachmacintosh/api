import type { Env } from "../../types";
import cleanUpChannels from "./discord/cleanUpChannels";
import getRest from "../../discord/getRest";
import handleSensiboPods from "./sensibo/handleSensiboPods";
import monitorSteamGame from "./steam/monitorSteamGame";

export default async function handleScheduled(env: Env): Promise<void> {
  const MINUTE_10 = 10;
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York",
  };

  const localeString = new Date().toLocaleString("en-US", dateOptions);
  const date = new Date(localeString);
  const hour = date.getHours();
  const minute = date.getMinutes();

  const rest = getRest(env);

  if (minute < MINUTE_10) {
    await cleanUpChannels(env, rest);
    await handleSensiboPods(env, rest, hour);
  }
  await monitorSteamGame(env, rest);
}
