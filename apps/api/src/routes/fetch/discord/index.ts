import { type IRequestStrict, Router } from "itty-router";
import type { CF } from "../../../types";
import handleInteraction from "../../../discord/handleInteraction";
import registerDiscordCommands from "../../../discord/registerDiscordCommands";

const discordRouter = Router<IRequestStrict, CF>({ base: "/discord" })
  .get("/install", async (_request, env) => {
    return await registerDiscordCommands(env);
  })
  .post("/interaction", async (request, env) => {
    return await handleInteraction(request, env);
  });

export default discordRouter;
