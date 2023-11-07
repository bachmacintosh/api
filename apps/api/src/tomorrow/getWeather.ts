import type { Env, TomorrowRequest, TomorrowResponse } from "../types";

export default async function getWeather(env: Env): Promise<TomorrowResponse> {
  const url = "https://api.tomorrow.io/v4/timelines";
  const headers = {
    apikey: env.TOMORROW_API_KEY,
    "Content-Type": "application/json",
  };
  const tomorrowRequest: TomorrowRequest = {
    location: env.TOMORROW_LOCATION_ID,
    fields: ["temperature"],
    units: "imperial",
    timesteps: ["current"],
  };
  const init: RequestInit<RequestInitCfProperties> = {
    method: "POST",
    headers,
    body: JSON.stringify(tomorrowRequest),
  };
  const response = await fetch(url, init);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Could not fetch Tomorrow data, HTTP Status ${response.status}`);
  }
}
