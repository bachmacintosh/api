import type { APIEmbedField, Env, QueueBody } from "../../../types";
import type { REST } from "@discordjs/rest";
import capitalize from "../../../util/capitalize";
import getDrizzle from "../../../db/d1";
import resultEmbed from "../../../discord/embeds/resultEmbed";
import setAcState from "../../../sensibo/setAcState";
import updateOriginalInteraction from "../../../discord/updateOriginalInteraction";

export default async function handleSetAcState(
  env: Env,
  rest: REST,
  message: Message<QueueBody<"setAcState">>,
): Promise<void> {
  const db = getDrizzle(env.DB);
  try {
    const foundPod = await db.query.sensiboPods.findFirst({
      where: (pod, { eq }) => {
        return eq(pod.id, message.body.params.podId);
      },
    });
    if (typeof foundPod === "undefined") {
      throw new Error(`Pod ID ${message.body.params.podId} Not Found`);
    }
    await setAcState(env, message.body.params.podId, message.body.params.acState);
    const updatedItems: APIEmbedField[] = [];
    updatedItems.push({ name: "Pod", value: foundPod.name });
    if (typeof message.body.params.acState.on !== "undefined") {
      updatedItems.push({ name: "Power", value: message.body.params.acState.on ? "On" : "Off", inline: true });
    }
    if (typeof message.body.params.acState.mode !== "undefined") {
      updatedItems.push({ name: "Mode", value: capitalize(message.body.params.acState.mode), inline: true });
    }
    if (typeof message.body.params.acState.fanLevel !== "undefined") {
      updatedItems.push({ name: "Fan", value: capitalize(message.body.params.acState.fanLevel), inline: true });
    }
    if (typeof message.body.params.acState.targetTemperature !== "undefined") {
      updatedItems.push({
        name: "Temperature",
        value: `${message.body.params.acState.targetTemperature}°F`,
        inline: true,
      });
    }
    if (typeof message.body.params.acState.swing !== "undefined") {
      updatedItems.push({ name: "Swing", value: capitalize(message.body.params.acState.swing), inline: true });
    }
    if (typeof message.body.params.acState.light !== "undefined") {
      updatedItems.push({ name: "Light", value: capitalize(message.body.params.acState.light), inline: true });
    }
    await updateOriginalInteraction(env, rest, message.body.params.interactionToken, {
      embeds: [resultEmbed("success", "A/C State Updated", "It was set to the following values:", updatedItems)],
    });
  } catch (error) {
    console.error(error);
    message.retry();
  }
}
