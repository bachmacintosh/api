import type {
  EventSubSubscriptionEventMap,
  EventSubSubscriptionType,
  EventSubWebhookSubscription,
} from "@bachmacintosh/api-types";
import type { QueuedEmbed } from "./discord";

export type EventSubWebhookNotificationHanlder<T extends EventSubSubscriptionType> = (
  event: EventSubSubscriptionEventMap[T],
) => QueuedEmbed | null;

export type EventSubRevocationHandler = (
  subscription: EventSubWebhookSubscription<
    EventSubSubscriptionType,
    | "authorization_revoked"
    | "moderator_removed"
    | "notification_failures_exceeded"
    | "user_removed"
    | "version_removed"
  >,
) => QueuedEmbed | null;
