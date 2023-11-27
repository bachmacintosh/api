import type {
  EventSubSubscriptionEventMap,
  EventSubSubscriptionType,
  EventSubWebhookSubscription,
} from "@bachmacintosh/api-types";
import type { QueuedEmbed } from "./discord";

export type EventSubWebhookNotificationHanlder<T extends EventSubSubscriptionType> = (
  subscription: EventSubWebhookSubscription<T, "enabled">,
  event: EventSubSubscriptionEventMap[T],
) => QueuedEmbed | null;
