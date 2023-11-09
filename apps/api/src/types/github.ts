import type { WebhookEventMap, WebhookEventName } from "@octokit/webhooks-types";
import type { Env } from "./cloudflare";
import type { REST } from "@discordjs/rest";

export type GitHubWebhookEventRunner<K extends WebhookEventName> = (
  event: WebhookEventMap[K],
  env: Env,
  rest: REST,
) => Promise<void>;
