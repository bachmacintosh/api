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
        case "channel.ban":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"channel.ban">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "channel.ban",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        case "channel.chat.clear_user_messages":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"channel.chat.clear_user_messages">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "channel.chat.clear_user_messages",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        case "channel.chat.clear":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"channel.chat.clear">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "channel.chat.clear",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        case "channel.chat.message_delete":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"channel.chat.message_delete">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "channel.chat.message_delete",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
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
        case "channel.shield_mode.begin":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"channel.shield_mode.begin">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "channel.shield_mode.begin",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        case "channel.shield_mode.end":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"channel.shield_mode.end">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "channel.shield_mode.end",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        case "channel.shoutout.create":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"channel.shoutout.create">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "channel.shoutout.create",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        case "channel.shoutout.receive":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"channel.shoutout.receive">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "channel.shoutout.receive",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        case "channel.unban":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"channel.unban">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "channel.unban",
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
        case "user.authorization.grant":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"user.authorization.grant">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "user.authorization.grant",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        case "user.authorization.revoke":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"user.authorization.revoke">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "user.authorization.revoke",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
        case "user.update":
          {
            const body = await request.json<EventSubWebhookMessageNotification<"user.update">>();
            await env.QUEUE.send({
              method: "processTwitchEventSub",
              params: {
                message: "notification",
                subscriptionType: "user.update",
                subscription: body.subscription,
                event: body.event,
              },
            });
          }
          break;
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
