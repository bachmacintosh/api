import { type Env, type SensiboPodCollectionResponse, sensiboBaseUrl } from "../types";

export default async function getAllPods(env: Env): Promise<SensiboPodCollectionResponse> {
  let url = `${sensiboBaseUrl}/users/me/pods`;
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
    const data = await response.json<SensiboPodCollectionResponse>();
    return data;
  } else {
    const data: SensiboPodCollectionResponse = {
      result: [],
      status: "error",
    };
    return data;
  }
}
