import { type Env, Routes } from "../../../types";
import { get, set } from "../../../db/kv";
import type { REST } from "@discordjs/rest";
import getPlayerSummaries from "../../../steam/getPlayerSummaries";
import resultEmbed from "../../../discord/embeds/resultEmbed";

export default async function monitorSteamGame(env: Env, rest: REST): Promise<void> {
  const config = await get(env, "config_steam");
  if (config.status === "running") {
    const oldSteamInfo = await get(env, "steam_user_info");
    const steamInfo = await getPlayerSummaries(env);
    const currentSteamUserInfo = steamInfo.response.players[0];
    if (oldSteamInfo === null) {
      let description = "No Steam Game Running";
      if (typeof currentSteamUserInfo.gameextrainfo !== "undefined") {
        description = `Storing Current Game: ${currentSteamUserInfo.gameextrainfo}`;
      }
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_STEAM), {
        body: { embeds: resultEmbed("warn", "No previous Steam info was found.", description) },
      });
    } else {
      const previousSteamUserInfo = oldSteamInfo.response.players[0];
      if (
        typeof previousSteamUserInfo.gameextrainfo === "undefined" &&
        typeof currentSteamUserInfo.gameextrainfo !== "undefined"
      ) {
        await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_STEAM), {
          body: {
            embeds: resultEmbed(
              "success",
              `Tracking New Steam Game: ${currentSteamUserInfo.gameextrainfo}`,
              "I'll let you know if it crashes.",
            ),
          },
        });
      } else if (
        typeof previousSteamUserInfo.gameextrainfo !== "undefined" &&
        typeof currentSteamUserInfo.gameextrainfo === "undefined"
      ) {
        await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_STEAM), {
          body: {
            content: `<@${env.DISCORD_MENTION_ID}>`,
            embeds: resultEmbed(
              "error",
              `${previousSteamUserInfo.gameextrainfo} Has Crashed`,
              "Game no longer reported as being open by Steam",
            ),
          },
        });
      }
    }
    await set(env, "steam_user_info", steamInfo, { expirationTtl: 86400 });
  }
}
