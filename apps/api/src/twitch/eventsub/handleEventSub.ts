import {
  type EventSubSubscriptionType,
  type EventSubWebhookMessageNotification,
  type EventSubWebhookMessageRevocation,
  type EventSubWebhookMessageType,
  type EventSubWebhookMessageWebhookCallbackVerification,
  HttpStatusCode,
} from "@bachmacintosh/api-types";
import { StatusError, json, text } from "itty-router";
import type { Env } from "../../types";

export default async function handleEventSub(request: Request, env: Env): Promise<Response> {
  const messageTypeHeader = request.headers.get("Twitch-Eventsub-Message-Type");
  const subscriptionTypeHeader = request.headers.get("Twitch-Eventsub-Subscription-Type");
  if (messageTypeHeader === null || subscriptionTypeHeader === null) {
    throw new StatusError(HttpStatusCode.BadRequest, "Missing EventSub Message/Subscription Type Header");
  }

  const messageType = messageTypeHeader as EventSubWebhookMessageType;
  const subscriptionType = subscriptionTypeHeader as EventSubSubscriptionType;

  switch (messageType) {
    case "notification":
      switch (subscriptionType) {
        case "channel.raid":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"channel.raid">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "channel.raid",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        case "stream.online":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"stream.online">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "stream.online",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        default: {
          const body = await request.json();
          console.error(body);
          throw new StatusError(
            HttpStatusCode.BadRequest,
            "EventSub Notification Subscription Type Type Not Implemented",
          );
        }
      }
      return json({ message: "EventSub Event Accepted" }, { status: HttpStatusCode.Accepted });
    case "revocation": {
      const body = await request.json<EventSubWebhookMessageRevocation<EventSubSubscriptionType>>();
      await env.QUEUE.send({
        method: "processTwitchEventSub",
        params: { message: "revocation", subscription: body.subscription },
      });
      return json({ message: "EventSub Event Accepted" }, { status: HttpStatusCode.Accepted });
    }
    case "webhook_callback_verification": {
      const body = await request.json<EventSubWebhookMessageWebhookCallbackVerification<EventSubSubscriptionType>>();
      return text(body.challenge, { status: HttpStatusCode.Ok });
    }
    default: {
      const body = await request.json();
      console.error(body);
      throw new StatusError(HttpStatusCode.BadRequest, "EventSub Message Type Not Implemented");
    }
  }
}
