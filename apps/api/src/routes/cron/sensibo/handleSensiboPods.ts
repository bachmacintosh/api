import { type APIEmbedField, type AcState, type Env, Routes } from "../../../types";
import type { REST } from "@discordjs/rest";
import capitalize from "../../../util/capitalize";
import convertTemperature from "../../../sensibo/convertTemperature";
import { get } from "../../../db/kv";
import getDrizzle from "../../../db/d1";
import getPod from "../../../sensibo/getPod";
import getWeather from "../../../tomorrow/getWeather";
import isHourBetween from "../../../util/isHourBetween";
import resultEmbed from "../../../discord/embeds/resultEmbed";
import setAcState from "../../../sensibo/setAcState";

export default async function handleSensiboPods(env: Env, rest: REST, hour: number): Promise<void> {
  const config = await get(env, "config_sensibo");
  const weather = await getWeather(env);
  const outdoorTemperature = weather.data.timelines[0].intervals[0].values.temperature;

  const db = getDrizzle(env.DB);
  const pods = await db.query.sensiboPods.findMany({
    with: {
      actions: {
        orderBy: (action, { asc }) => {
          return asc(action.priority);
        },
      },
    },
  });
  for (const pod of pods) {
    let hasFired = false;
    // eslint-disable-next-line no-await-in-loop -- Must be in order
    const sensiboPod = await getPod(env, pod.id);
    if (sensiboPod.status === "error") {
      throw new Error("Error fetching Sensibo info.");
    }
    const { acState, measurements } = sensiboPod.result;
    const roomTemperature = convertTemperature(measurements.temperature);
    for (const action of pod.actions) {
      if (action.enabled && !hasFired) {
        // Will be set to false if a trigger is set but its condition is NOT met
        let canFire = true;
        // Will be set to true if a trigger is set and its condition is met
        let mayFire = false;

        const acStateFields: APIEmbedField[] = [];
        const conditionFields: APIEmbedField[] = [];

        if (action.currentMode !== null) {
          if (action.currentMode === acState.mode) {
            conditionFields.push({ name: "Current Mode", value: action.currentMode, inline: true });
            mayFire = true;
          } else {
            canFire = false;
          }
        }
        if (action.roomTempAbove !== null || action.roomTempBelow !== null) {
          conditionFields.push({ name: "Current Room Temp.", value: roomTemperature.toString(), inline: true });
        }
        if (action.roomTempAbove !== null && action.roomTempBelow !== null) {
          if (roomTemperature > action.roomTempAbove && roomTemperature < action.roomTempBelow) {
            conditionFields.push({
              name: "Room Temp. Between",
              value: `${action.roomTempAbove}-${action.roomTempBelow}`,
            });
            mayFire = true;
          } else {
            canFire = false;
          }
        } else if (action.roomTempAbove !== null) {
          if (roomTemperature > action.roomTempAbove) {
            conditionFields.push({ name: "Room Temp. Above", value: action.roomTempAbove.toString(), inline: true });
            mayFire = true;
          } else {
            canFire = false;
          }
        } else if (action.roomTempBelow !== null) {
          if (roomTemperature < action.roomTempBelow) {
            conditionFields.push({ name: "Room Temp. Below", value: action.roomTempBelow.toString(), inline: true });
            mayFire = true;
          } else {
            canFire = false;
          }
        }

        if (action.outdoorTempAbove !== null || action.outdoorTempBelow !== null) {
          conditionFields.push({ name: "Current Outdoor Temp.", value: outdoorTemperature.toString(), inline: true });
        }
        if (action.outdoorTempAbove !== null && action.outdoorTempBelow !== null) {
          if (outdoorTemperature > action.outdoorTempAbove && outdoorTemperature < action.outdoorTempBelow) {
            conditionFields.push({
              name: "Outdoor Temp. Between",
              value: `${action.outdoorTempAbove}-${action.outdoorTempBelow}`,
            });
            mayFire = true;
          } else {
            canFire = false;
          }
        } else if (action.outdoorTempAbove !== null) {
          if (outdoorTemperature > action.outdoorTempAbove) {
            conditionFields.push({
              name: "Outdoor Temp. Above",
              value: action.outdoorTempAbove.toString(),
              inline: true,
            });
            mayFire = true;
          } else {
            canFire = false;
          }
        } else if (action.outdoorTempBelow !== null) {
          if (outdoorTemperature <= action.outdoorTempBelow) {
            conditionFields.push({
              name: "Outdoor Temp. Below",
              value: action.outdoorTempBelow.toString(),
              inline: true,
            });
            mayFire = true;
          } else {
            canFire = false;
          }
        }
        if (action.timeHourAfter !== null || action.timeHourBefore !== null) {
          conditionFields.push({ name: "Current Hour", value: hour.toString(), inline: true });
        }
        if (action.timeHourAfter !== null && action.timeHourBefore !== null) {
          if (isHourBetween(hour, action.timeHourAfter, action.timeHourBefore)) {
            conditionFields.push({
              name: "Hour Between",
              value: `${action.timeHourAfter}-${action.timeHourBefore}`,
            });
            mayFire = true;
          } else {
            canFire = false;
          }
        } else if (action.timeHourAfter !== null) {
          if (isHourBetween(hour, action.timeHourAfter, config.cutoffHour)) {
            conditionFields.push({
              name: "Hour After",
              value: action.timeHourAfter.toString(),
              inline: true,
            });
            mayFire = true;
          } else {
            canFire = false;
          }
        } else if (action.timeHourBefore !== null) {
          if (isHourBetween(hour, config.cutoffHour, action.timeHourBefore)) {
            conditionFields.push({
              name: "Hour Before",
              value: action.timeHourBefore.toString(),
              inline: true,
            });
            mayFire = true;
          } else {
            canFire = false;
          }
        }
        // At least one condition was set, and no set conditions were NOT met
        if (canFire && mayFire) {
          const newAcState: Partial<AcState> = {};
          if (action.on !== null) {
            acStateFields.push({ name: "Power", value: action.on ? "On" : "Off", inline: true });
            newAcState.on = action.on;
          }
          if (action.mode !== null) {
            acStateFields.push({ name: "Mode", value: capitalize(action.mode), inline: true });
            newAcState.mode = action.mode;
          }
          if (action.fanLevel !== null) {
            acStateFields.push({ name: "Fan Level", value: capitalize(action.fanLevel), inline: true });
            newAcState.fanLevel = action.fanLevel;
          }
          if (action.targetTemperature !== null) {
            acStateFields.push({ name: "Temperature", value: action.targetTemperature.toString(), inline: true });
            newAcState.targetTemperature = action.targetTemperature;
          }
          if (action.swing !== null) {
            acStateFields.push({ name: "Swing Mode", value: capitalize(action.swing), inline: true });
            newAcState.swing = action.swing;
          }
          if (action.light !== null) {
            acStateFields.push({ name: "Light", value: capitalize(action.light), inline: true });
            newAcState.light = action.light;
          }
          if (
            typeof newAcState.on !== "undefined" ||
            typeof newAcState.mode !== "undefined" ||
            typeof newAcState.fanLevel !== "undefined" ||
            typeof newAcState.targetTemperature !== "undefined" ||
            typeof newAcState.swing !== "undefined" ||
            typeof newAcState.light !== "undefined"
          ) {
            // eslint-disable-next-line no-await-in-loop -- Must be in order
            await setAcState(env, pod.id, newAcState);
            // eslint-disable-next-line no-await-in-loop -- Must be in order
            await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_SENSIBO), {
              body: {
                embeds: [
                  resultEmbed("success", pod.name, "The following A/C State was set:"),
                  resultEmbed("success", "", "It was set because these conditions were met:", conditionFields),
                ],
              },
            });

            hasFired = true;
          }
        }
      }
    }
    if (!hasFired) {
      const currentFields: APIEmbedField[] = [
        { name: "Current Mode", value: capitalize(acState.mode), inline: true },
        { name: "Room Temp.", value: roomTemperature.toString(), inline: true },
        { name: "Outdoor Temp.", value: outdoorTemperature.toString(), inline: true },
        { name: "Hour", value: hour.toString(), inline: true },
      ];
      // eslint-disable-next-line no-await-in-loop -- Must be in order
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_SENSIBO), {
        body: {
          embeds: [resultEmbed("info", pod.name, "No actions were triggered for this Sensibo Pod.", currentFields)],
        },
      });
    }
  }
}
