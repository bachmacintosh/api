import { type Env, type SensiboPodResponse, sensiboBaseUrl } from "../types";

export default async function getPod(env: Env, podId: string): Promise<SensiboPodResponse> {
  let url = `${sensiboBaseUrl}/pods/${podId}/`;
  const fields = [
    "id",
    "temperatureUnit",
    "acState",
    "location",
    "room",
    "connectionStatus",
    "timer",
    "schedules",
    "remoteCapabilities",
    "smartMode",
    "measurements",
  ];
  url += `?apiKey=${env.SENSIBO_API_KEY}&fields=${fields.join(",")}`;

  const init: RequestInit<RequestInitCfProperties> = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch(url, init);
  if (response.ok) {
    return await response.json<SensiboPodResponse>();
  } else {
    const error = await response.text();
    throw new Error(error);
  }
}
