import type {
  EventSubSubscriptionEventMap,
  EventSubSubscriptionType,
  EventSubWebhookSubscription,
} from "@bachmacintosh/api-types";
import type { QueuedEmbed } from "./discord";

export type EventSubWebhookNotificationHanlder<T extends EventSubSubscriptionType> = (
  event: EventSubSubscriptionEventMap[T],
  subscription: EventSubWebhookSubscription<T, "enabled">,
) => QueuedEmbed | null;
