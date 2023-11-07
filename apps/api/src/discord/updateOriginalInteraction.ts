import { type Env, type RESTPatchAPIWebhookWithTokenMessageJSONBody, Routes } from "../types";
import type { REST } from "@discordjs/rest";

export default async function updateOriginalInteraction(
  env: Env,
  rest: REST,
  token: string,
  body: RESTPatchAPIWebhookWithTokenMessageJSONBody,
): Promise<void> {
  await rest.patch(Routes.webhookMessage(env.DISCORD_BOT_CLIENT_ID, token, "@original"), { body });
}
