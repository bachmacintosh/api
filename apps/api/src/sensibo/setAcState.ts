import { type AcState, type Env, sensiboBaseUrl } from "../types";

export default async function setAcState(env: Env, podId: string, acState: Partial<AcState>): Promise<void> {
  const url = `${sensiboBaseUrl}/pods/${podId}/acStates?apiKey=${env.SENSIBO_API_KEY}`;
  const init: RequestInit<RequestInitCfProperties> = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ acState }),
  };
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error("A/C State not updated.");
  }
}
