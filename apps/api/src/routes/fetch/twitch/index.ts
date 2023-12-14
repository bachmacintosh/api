import { type IRequestStrict, Router, StatusError } from "itty-router";
import { handleEventSub, verifyEventSub } from "../../../twitch";
import type { CF } from "../../../types";
import { HttpStatusCode } from "@bachmacintosh/api-types";

const twitchRouter = Router<IRequestStrict, CF>({ base: "/twitch" }).post("/eventsub", async (request, env) => {
  const isAuthorized = await verifyEventSub(request, env.TWITCH_EVENTSUB_SECRET);
  if (!isAuthorized) {
    throw new StatusError(HttpStatusCode.Unauthorized, "Unauthorized, nice try.");
  }
  return await handleEventSub(request, env);
});

export default twitchRouter;
