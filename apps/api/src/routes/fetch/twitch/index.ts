import {
  type EventSubWebhookMessageType,
  type EventSubWebhookMessageWebhookCallbackVerification,
  HttpStatusCode,
} from "@bachmacintosh/api-types";
import { type IRequestStrict, Router, StatusError, text } from "itty-router";
import type { CF } from "../../../types";

import verifyEventSub from "../../../twitch/eventsub/verifyEventSub";

const twitchRouter = Router<IRequestStrict, CF>({ base: "/twitch" }).post("/eventsub", async (request, env) => {
  const messageTypeHeader = request.headers.get("Twitch-Eventsub-Message-Type");
  if (messageTypeHeader === null) {
    throw new StatusError(HttpStatusCode.BadRequest, "Missing EventSub Message Type Header");
  }
  const isAuthorized = await verifyEventSub(request, env.TWITCH_EVENTSUB_SECRET);
  if (!isAuthorized) {
    throw new StatusError(HttpStatusCode.Unauthorized, "Unauthorized, nice try.");
  }

  const messageType = messageTypeHeader as EventSubWebhookMessageType;

  switch (messageType) {
    case "webhook_callback_verification": {
      const body = await request.json<EventSubWebhookMessageWebhookCallbackVerification>();
      return text(body.challenge, { status: HttpStatusCode.Ok });
    }
    default: {
      const body = await request.json();
      console.error(body);
      throw new StatusError(HttpStatusCode.BadRequest, "EventSub Message Type Not Implemented");
    }
  }
});

export default twitchRouter;
