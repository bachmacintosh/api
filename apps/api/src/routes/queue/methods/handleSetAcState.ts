import type { APIEmbedField, Env, QueueMethods } from "../../../types";
import type { REST } from "@discordjs/rest";
import capitalize from "../../../util/capitalize";
import getDrizzle from "../../../db/d1";
import resultEmbed from "../../../discord/embeds/resultEmbed";
import setAcState from "../../../sensibo/setAcState";
import updateOriginalInteraction from "../../../discord/updateOriginalInteraction";

export default async function handleSetAcState(
  env: Env,
  rest: REST,
  params: QueueMethods["setAcState"],
): Promise<void> {
  const db = getDrizzle(env.DB);
  const foundPod = await db.query.sensiboPods.findFirst({
    where: (pod, { eq }) => {
      return eq(pod.id, params.podId);
    },
  });
  if (typeof foundPod === "undefined") {
    throw new Error(`Pod ID ${params.podId} Not Found`);
  }
  await setAcState(env, params.podId, params.acState);
  const updatedItems: APIEmbedField[] = [];
  updatedItems.push({ name: "Pod", value: foundPod.name });
  if (typeof params.acState.on !== "undefined") {
    updatedItems.push({ name: "Power", value: params.acState.on ? "On" : "Off", inline: true });
  }
  if (typeof params.acState.mode !== "undefined") {
    updatedItems.push({ name: "Mode", value: capitalize(params.acState.mode), inline: true });
  }
  if (typeof params.acState.fanLevel !== "undefined") {
    updatedItems.push({ name: "Fan", value: capitalize(params.acState.fanLevel), inline: true });
  }
  if (typeof params.acState.targetTemperature !== "undefined") {
    updatedItems.push({
      name: "Temperature",
      value: `${params.acState.targetTemperature}°F`,
      inline: true,
    });
  }
  if (typeof params.acState.swing !== "undefined") {
    updatedItems.push({ name: "Swing", value: capitalize(params.acState.swing), inline: true });
  }
  if (typeof params.acState.light !== "undefined") {
    updatedItems.push({ name: "Light", value: capitalize(params.acState.light), inline: true });
  }
  await updateOriginalInteraction(env, rest, params.interactionToken, {
    embeds: [resultEmbed("success", "A/C State Updated", "It was set to the following values:", updatedItems)],
  });
}
