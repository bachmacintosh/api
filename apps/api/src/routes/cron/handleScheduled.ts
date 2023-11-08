import type { Env } from "../../types";
import cleanUpChannels from "./discord/cleanUpChannels";
import getRest from "../../discord/getRest";
import handleSensiboPods from "./sensibo/handleSensiboPods";
import monitorSteamGame from "./steam/monitorSteamGame";

export default async function handleScheduled(env: Env): Promise<void> {
  const HOUR_08 = 8;
  const MINUTE_10 = 10;
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York",
  };

  const localeString = new Date().toLocaleString("en-US", dateOptions);
  const date = new Date(localeString);
  const hour = date.getHours();
  const minute = date.getMinutes();

  const rest = getRest(env);

  switch (hour) {
    case HOUR_08:
      if (minute < MINUTE_10) {
        await cleanUpChannels(env, rest);
      }
      break;
    default:
      if (minute < MINUTE_10) {
        await handleSensiboPods(env, rest, hour);
      }
      await monitorSteamGame(env, rest);
  }

  if (minute < MINUTE_10) {
    await handleSensiboPods(env, rest, hour);
  }
}
