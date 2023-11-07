import { APIVersion, type Env } from "../types";
import { REST } from "@discordjs/rest";
import makeRequest from "./makeRequest";

export default function getRest(env: Env): REST {
  return new REST({ version: APIVersion, makeRequest }).setToken(env.DISCORD_BOT_TOKEN);
}
