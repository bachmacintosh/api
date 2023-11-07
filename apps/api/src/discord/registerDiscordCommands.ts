import { type Env, type RESTPostAPIApplicationGuildCommandsJSONBody, Routes } from "../types";
import { StatusError, json } from "itty-router";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import commands from "./commands";
import getRest from "./getRest";

export default async function registerDiscordCommands(env: Env): Promise<Response> {
  if (env.WORKER_ENV !== "development") {
    throw new StatusError(HttpStatusCode.NotFound);
  }
  const guildCommands: RESTPostAPIApplicationGuildCommandsJSONBody[] = [];
  commands.forEach((command) => {
    guildCommands.push(command.data);
  });
  if (guildCommands.length > 0) {
    const rest = getRest(env);
    await rest.put(Routes.applicationGuildCommands(env.DISCORD_BOT_CLIENT_ID, env.DISCORD_GUILD_ID), {
      body: guildCommands,
    });
    return json({ message: "Successfully reigstered commands." }, { status: HttpStatusCode.Ok });
  } else {
    throw new StatusError(HttpStatusCode.UnprocessableEntity, "No commands were registered.");
  }
}
