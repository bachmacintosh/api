import {
  type APIEmbed,
  type APIEmbedField,
  type AcState,
  ApplicationCommandOptionType,
  type DiscordCommandRunner,
  type DiscordSubcommandRunner,
  InteractionResponseType,
  isAcLightMode,
  isAcMode,
  isAcSwingMode,
  isFanLevel,
} from "../../../types";
import { get, set } from "../../../db/kv";
import getDrizzle, { type NewSensiboAction, type NewSensiboPod, sensiboActions, sensiboPods } from "../../../db/d1";
import capitalize from "../../../util/capitalize";
import { eq } from "drizzle-orm";
import getPod from "../../../sensibo/getPod";
import resultEmbed from "../../embeds/resultEmbed";

const handleActionsAdd: DiscordSubcommandRunner = async (subcommandOption, env, _interaction) => {
  if (typeof subcommandOption.options === "undefined" || subcommandOption.options.length === 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed(
            "error",
            "Invalid Command Execution",
            "This command was not executed at the proper level, this is likely a bug.",
          ),
        ],
      },
    };
  }
  const podOption = subcommandOption.options.find((option) => {
    return option.name === "pod";
  });
  const enabledOption = subcommandOption.options.find((option) => {
    return option.name === "enabled";
  });
  const priorityOption = subcommandOption.options.find((option) => {
    return option.name === "priority";
  });
  const nameOption = subcommandOption.options.find((option) => {
    return option.name === "name";
  });
  if (
    typeof podOption !== "undefined" &&
    podOption.type === ApplicationCommandOptionType.String &&
    typeof enabledOption !== "undefined" &&
    enabledOption.type === ApplicationCommandOptionType.Boolean &&
    typeof priorityOption !== "undefined" &&
    priorityOption.type === ApplicationCommandOptionType.Integer &&
    typeof nameOption !== "undefined" &&
    nameOption.type === ApplicationCommandOptionType.String
  ) {
    try {
      const addedItems: APIEmbedField[] = [];
      const db = getDrizzle(env.DB);
      const foundPod = await db.query.sensiboPods.findFirst({
        where: (pod) => {
          return eq(pod.id, podOption.value);
        },
      });
      if (typeof foundPod === "undefined") {
        throw new Error(`Pod ID ${podOption.value} Not Found`);
      }
      addedItems.push({ name: "Pod", value: foundPod.name });
      addedItems.push({ name: "Enabled", value: enabledOption.value ? "True" : "False" });
      addedItems.push({ name: "Priority", value: priorityOption.value.toString() });
      addedItems.push({ name: "Name", value: nameOption.value });
      const newAction: NewSensiboAction = {
        podId: foundPod.id,
        enabled: enabledOption.value,
        priority: priorityOption.value,
        name: nameOption.value,
      };
      const currentModeOption = subcommandOption.options.find((option) => {
        return option.name === "current_mode";
      });
      if (
        typeof currentModeOption !== "undefined" &&
        currentModeOption.type === ApplicationCommandOptionType.String &&
        (isAcMode(currentModeOption.value) || currentModeOption.value === "off")
      ) {
        newAction.currentMode = currentModeOption.value;
        addedItems.push({ name: "Current Mode", value: capitalize(currentModeOption.value), inline: true });
      }
      const roomTempAboveOption = subcommandOption.options.find((option) => {
        return option.name === "room_temp_above";
      });
      if (
        typeof roomTempAboveOption !== "undefined" &&
        roomTempAboveOption.type === ApplicationCommandOptionType.Integer
      ) {
        newAction.roomTempAbove = roomTempAboveOption.value;
        addedItems.push({ name: "Room Temp Above", value: roomTempAboveOption.value.toString(), inline: true });
      }
      const roomTempBelowOption = subcommandOption.options.find((option) => {
        return option.name === "room_temp_below";
      });
      if (
        typeof roomTempBelowOption !== "undefined" &&
        roomTempBelowOption.type === ApplicationCommandOptionType.Integer
      ) {
        newAction.roomTempBelow = roomTempBelowOption.value;
        addedItems.push({ name: "Room Temp Below", value: roomTempBelowOption.value.toString(), inline: true });
      }
      const outdoorTempAboveOption = subcommandOption.options.find((option) => {
        return option.name === "outdoor_temp_above";
      });
      if (
        typeof outdoorTempAboveOption !== "undefined" &&
        outdoorTempAboveOption.type === ApplicationCommandOptionType.Integer
      ) {
        newAction.outdoorTempAbove = outdoorTempAboveOption.value;
        addedItems.push({ name: "Outdoor Temp Above", value: outdoorTempAboveOption.value.toString(), inline: true });
      }
      const outdoorTempBelowOption = subcommandOption.options.find((option) => {
        return option.name === "outdoor_temp_below";
      });
      if (
        typeof outdoorTempBelowOption !== "undefined" &&
        outdoorTempBelowOption.type === ApplicationCommandOptionType.Integer
      ) {
        newAction.outdoorTempBelow = outdoorTempBelowOption.value;
        addedItems.push({ name: "Outdoor Temp Below", value: outdoorTempBelowOption.value.toString(), inline: true });
      }
      const timeHourAfterOption = subcommandOption.options.find((option) => {
        return option.name === "time_hour_after";
      });
      if (
        typeof timeHourAfterOption !== "undefined" &&
        timeHourAfterOption.type === ApplicationCommandOptionType.Integer
      ) {
        newAction.timeHourAfter = timeHourAfterOption.value;
        addedItems.push({ name: "Time Hour After", value: timeHourAfterOption.value.toString(), inline: true });
      }
      const timeHourBeforeOption = subcommandOption.options.find((option) => {
        return option.name === "time_hour_before";
      });
      if (
        typeof timeHourBeforeOption !== "undefined" &&
        timeHourBeforeOption.type === ApplicationCommandOptionType.Integer
      ) {
        newAction.timeHourBefore = timeHourBeforeOption.value;
        addedItems.push({ name: "Time Hour Before", value: timeHourBeforeOption.value.toString(), inline: true });
      }
      const powerOption = subcommandOption.options.find((option) => {
        return option.name === "power";
      });
      if (typeof powerOption !== "undefined" && powerOption.type === ApplicationCommandOptionType.String) {
        switch (powerOption.value) {
          case "on":
            newAction.on = true;
            break;
          case "off":
            newAction.on = false;
          // No Default
        }
        addedItems.push({ name: "Power", value: capitalize(powerOption.value), inline: true });
      }
      const modeOption = subcommandOption.options.find((option) => {
        return option.name === "mode";
      });
      if (
        typeof modeOption !== "undefined" &&
        modeOption.type === ApplicationCommandOptionType.String &&
        isAcMode(modeOption.value)
      ) {
        newAction.mode = modeOption.value;
        addedItems.push({ name: "Mode", value: capitalize(modeOption.value), inline: true });
      }
      const fanLevelOption = subcommandOption.options.find((option) => {
        return option.name === "fan_level";
      });
      if (
        typeof fanLevelOption !== "undefined" &&
        fanLevelOption.type === ApplicationCommandOptionType.String &&
        isFanLevel(fanLevelOption.value)
      ) {
        newAction.fanLevel = fanLevelOption.value;
        addedItems.push({ name: "Fan Level", value: capitalize(fanLevelOption.value), inline: true });
      }
      const temperatureOption = subcommandOption.options.find((option) => {
        return option.name === "temperature";
      });
      if (typeof temperatureOption !== "undefined" && temperatureOption.type === ApplicationCommandOptionType.Integer) {
        newAction.targetTemperature = temperatureOption.value;
        addedItems.push({ name: "Temperature", value: temperatureOption.value.toString(), inline: true });
      }
      const swingOption = subcommandOption.options.find((option) => {
        return option.name === "swing_type";
      });
      if (
        typeof swingOption !== "undefined" &&
        swingOption.type === ApplicationCommandOptionType.String &&
        isAcSwingMode(swingOption.value)
      ) {
        newAction.swing = swingOption.value;
        addedItems.push({ name: "Swing Mode", value: capitalize(swingOption.value), inline: true });
      }
      const lightOption = subcommandOption.options.find((option) => {
        return option.name === "light";
      });
      if (
        typeof lightOption !== "undefined" &&
        lightOption.type === ApplicationCommandOptionType.String &&
        isAcLightMode(lightOption.value)
      ) {
        newAction.light = lightOption.value;
        addedItems.push({ name: "Light", value: capitalize(lightOption.value), inline: true });
      }
      await db.insert(sensiboActions).values(newAction).run();
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [resultEmbed("success", "Action Added", "With the following values:", addedItems)],
        },
      };
    } catch (error) {
      console.error(error);
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [resultEmbed("error", "Error Adding Action", "Likely caused by a database issue. Check logs.")],
        },
      };
    }
  }
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [
        resultEmbed(
          "error",
          "Invalid Command Execution",
          "This command was not executed at the proper level, this is likely a bug.",
        ),
      ],
    },
  };
};

const handleActionsClear: DiscordSubcommandRunner = async (subcommandOption, env) => {
  if (typeof subcommandOption.options === "undefined" || subcommandOption.options.length === 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed(
            "error",
            "Invalid Command Execution",
            "This command was not executed at the proper level, this is likely a bug.",
          ),
        ],
      },
    };
  }
  const podOption = subcommandOption.options.find((option) => {
    return option.name === "pod";
  });
  const actionOption = subcommandOption.options.find((option) => {
    return option.name === "action";
  });
  if (
    typeof podOption !== "undefined" &&
    podOption.type === ApplicationCommandOptionType.String &&
    typeof actionOption !== "undefined" &&
    actionOption.type === ApplicationCommandOptionType.String
  ) {
    try {
      const clearedFields: string[] = [];
      const actionId = Number.parseInt(actionOption.value, 10);
      const db = getDrizzle(env.DB);
      const foundPod = await db.query.sensiboPods.findFirst({
        where: (pod) => {
          return eq(pod.id, podOption.value);
        },
      });
      const foundAction = await db.query.sensiboActions.findFirst({
        where: (action) => {
          return eq(action.id, actionId);
        },
      });
      if (typeof foundAction === "undefined" || typeof foundPod === "undefined") {
        throw new Error(`Action ID ${actionId} Not Found`);
      }
      const currentModeOption = subcommandOption.options.find((option) => {
        return option.name === "current_mode";
      });
      if (
        typeof currentModeOption !== "undefined" &&
        currentModeOption.type === ApplicationCommandOptionType.Boolean &&
        currentModeOption.value
      ) {
        foundAction.currentMode = null;
        clearedFields.push("Current Mode");
      }
      const roomTempAboveOption = subcommandOption.options.find((option) => {
        return option.name === "room_temp_above";
      });
      if (
        typeof roomTempAboveOption !== "undefined" &&
        roomTempAboveOption.type === ApplicationCommandOptionType.Boolean &&
        roomTempAboveOption.value
      ) {
        foundAction.roomTempAbove = null;
        clearedFields.push("Room Temp Above");
      }
      const roomTempBelowOption = subcommandOption.options.find((option) => {
        return option.name === "room_temp_below";
      });
      if (
        typeof roomTempBelowOption !== "undefined" &&
        roomTempBelowOption.type === ApplicationCommandOptionType.Boolean &&
        roomTempBelowOption.value
      ) {
        foundAction.roomTempBelow = null;
        clearedFields.push("Room Temp Below");
      }
      const outdoorTempAboveOption = subcommandOption.options.find((option) => {
        return option.name === "outdoor_temp_above";
      });
      if (
        typeof outdoorTempAboveOption !== "undefined" &&
        outdoorTempAboveOption.type === ApplicationCommandOptionType.Boolean &&
        outdoorTempAboveOption.value
      ) {
        foundAction.outdoorTempAbove = null;
        clearedFields.push("Outdoor Temp Above");
      }
      const outdoorTempBelowOption = subcommandOption.options.find((option) => {
        return option.name === "outdoor_temp_below";
      });
      if (
        typeof outdoorTempBelowOption !== "undefined" &&
        outdoorTempBelowOption.type === ApplicationCommandOptionType.Boolean &&
        outdoorTempBelowOption.value
      ) {
        foundAction.outdoorTempBelow = null;
        clearedFields.push("Outdoor Temp Below");
      }
      const timeHourAfterOption = subcommandOption.options.find((option) => {
        return option.name === "time_hour_after";
      });
      if (
        typeof timeHourAfterOption !== "undefined" &&
        timeHourAfterOption.type === ApplicationCommandOptionType.Boolean &&
        timeHourAfterOption.value
      ) {
        foundAction.timeHourAfter = null;
        clearedFields.push("Time Hour After");
      }
      const timeHourBeforeOption = subcommandOption.options.find((option) => {
        return option.name === "time_hour_before";
      });
      if (
        typeof timeHourBeforeOption !== "undefined" &&
        timeHourBeforeOption.type === ApplicationCommandOptionType.Boolean &&
        timeHourBeforeOption.value
      ) {
        foundAction.timeHourBefore = null;
        clearedFields.push("Time Hour Before");
      }
      const powerOption = subcommandOption.options.find((option) => {
        return option.name === "power";
      });
      if (
        typeof powerOption !== "undefined" &&
        powerOption.type === ApplicationCommandOptionType.Boolean &&
        powerOption.value
      ) {
        foundAction.on = null;
        clearedFields.push("Power");
      }
      const modeOption = subcommandOption.options.find((option) => {
        return option.name === "mode";
      });
      if (
        typeof modeOption !== "undefined" &&
        modeOption.type === ApplicationCommandOptionType.Boolean &&
        modeOption.value
      ) {
        foundAction.mode = null;
        clearedFields.push("Mode");
      }
      const fanLevelOption = subcommandOption.options.find((option) => {
        return option.name === "fan_level";
      });
      if (
        typeof fanLevelOption !== "undefined" &&
        fanLevelOption.type === ApplicationCommandOptionType.Boolean &&
        fanLevelOption.value
      ) {
        foundAction.fanLevel = null;
        clearedFields.push("Fan Level");
      }
      const temperatureOption = subcommandOption.options.find((option) => {
        return option.name === "temperature";
      });
      if (
        typeof temperatureOption !== "undefined" &&
        temperatureOption.type === ApplicationCommandOptionType.Boolean &&
        temperatureOption.value
      ) {
        foundAction.targetTemperature = null;
        clearedFields.push("Temperature");
      }
      const swingOption = subcommandOption.options.find((option) => {
        return option.name === "swing_type";
      });
      if (
        typeof swingOption !== "undefined" &&
        swingOption.type === ApplicationCommandOptionType.Boolean &&
        swingOption.value
      ) {
        foundAction.swing = null;
        clearedFields.push("Swing Mode");
      }
      const lightOption = subcommandOption.options.find((option) => {
        return option.name === "light";
      });
      if (
        typeof lightOption !== "undefined" &&
        lightOption.type === ApplicationCommandOptionType.Boolean &&
        lightOption.value
      ) {
        foundAction.light = null;
        clearedFields.push("Light");
      }
      await db.update(sensiboActions).set(foundAction).where(eq(sensiboActions.id, foundAction.id)).run();
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [
            resultEmbed("success", "Action Fields Cleared", "The following action and its fields were cleared:", [
              { name: "Pod", value: foundPod.name },
              { name: "Action", value: foundAction.name },
              { name: "Cleared Fields", value: clearedFields.join(", ") },
            ]),
          ],
        },
      };
    } catch (error) {
      console.error(error);
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [resultEmbed("error", "Error Adding Action", "Likely caused by a database issue. Check logs.")],
        },
      };
    }
  }
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [
        resultEmbed(
          "error",
          "Invalid Command Execution",
          "This command was not executed at the proper level, this is likely a bug.",
        ),
      ],
    },
  };
};

const handleActionsEdit: DiscordSubcommandRunner = async (subcommandOption, env) => {
  if (typeof subcommandOption.options === "undefined" || subcommandOption.options.length === 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed(
            "error",
            "Invalid Command Execution",
            "This command was not executed at the proper level, this is likely a bug.",
          ),
        ],
      },
    };
  }
  const podOption = subcommandOption.options.find((option) => {
    return option.name === "pod";
  });
  const actionOption = subcommandOption.options.find((option) => {
    return option.name === "action";
  });
  if (
    typeof podOption !== "undefined" &&
    podOption.type === ApplicationCommandOptionType.String &&
    typeof actionOption !== "undefined" &&
    actionOption.type === ApplicationCommandOptionType.String
  ) {
    try {
      const updatedItems: APIEmbedField[] = [];
      const actionId = Number.parseInt(actionOption.value, 10);
      const db = getDrizzle(env.DB);
      const foundPod = await db.query.sensiboPods.findFirst({
        where: (pod) => {
          return eq(pod.id, podOption.value);
        },
      });
      const foundAction = await db.query.sensiboActions.findFirst({
        where: (action) => {
          return eq(action.id, actionId);
        },
      });
      if (typeof foundPod === "undefined" || typeof foundAction === "undefined") {
        throw new Error(`Pod ID ${podOption.value} Not Found`);
      }
      updatedItems.push({ name: "Pod", value: foundPod.name });
      updatedItems.push({ name: "Action", value: foundAction.name });
      const enabledOption = subcommandOption.options.find((option) => {
        return option.name === "enabled";
      });
      if (typeof enabledOption !== "undefined" && enabledOption.type === ApplicationCommandOptionType.Boolean) {
        foundAction.enabled = enabledOption.value;
        updatedItems.push({ name: "Enabled", value: enabledOption.value ? "True" : "False", inline: true });
      }
      const priorityOption = subcommandOption.options.find((option) => {
        return option.name === "priority";
      });
      if (typeof priorityOption !== "undefined" && priorityOption.type === ApplicationCommandOptionType.Integer) {
        foundAction.priority = priorityOption.value;
        updatedItems.push({ name: "Priority", value: priorityOption.value.toString(), inline: true });
      }
      const nameOption = subcommandOption.options.find((option) => {
        return option.name === "name";
      });
      if (typeof nameOption !== "undefined" && nameOption.type === ApplicationCommandOptionType.String) {
        foundAction.name = nameOption.value;
        updatedItems.push({ name: "Name", value: nameOption.value, inline: true });
      }
      const currentModeOption = subcommandOption.options.find((option) => {
        return option.name === "current_mode";
      });
      if (
        typeof currentModeOption !== "undefined" &&
        currentModeOption.type === ApplicationCommandOptionType.String &&
        (isAcMode(currentModeOption.value) || currentModeOption.value === "off")
      ) {
        foundAction.currentMode = currentModeOption.value;
        updatedItems.push({ name: "Current Mode", value: capitalize(currentModeOption.value), inline: true });
      }
      const roomTempAboveOption = subcommandOption.options.find((option) => {
        return option.name === "room_temp_above";
      });
      if (
        typeof roomTempAboveOption !== "undefined" &&
        roomTempAboveOption.type === ApplicationCommandOptionType.Integer
      ) {
        foundAction.roomTempAbove = roomTempAboveOption.value;
        updatedItems.push({ name: "Room Temp Above", value: roomTempAboveOption.value.toString(), inline: true });
      }
      const roomTempBelowOption = subcommandOption.options.find((option) => {
        return option.name === "room_temp_below";
      });
      if (
        typeof roomTempBelowOption !== "undefined" &&
        roomTempBelowOption.type === ApplicationCommandOptionType.Integer
      ) {
        foundAction.roomTempBelow = roomTempBelowOption.value;
        updatedItems.push({ name: "Room Temp Below", value: roomTempBelowOption.value.toString(), inline: true });
      }
      const outdoorTempAboveOption = subcommandOption.options.find((option) => {
        return option.name === "outdoor_temp_above";
      });
      if (
        typeof outdoorTempAboveOption !== "undefined" &&
        outdoorTempAboveOption.type === ApplicationCommandOptionType.Integer
      ) {
        foundAction.outdoorTempAbove = outdoorTempAboveOption.value;
        updatedItems.push({ name: "Outdoor Temp Above", value: outdoorTempAboveOption.value.toString(), inline: true });
      }
      const outdoorTempBelowOption = subcommandOption.options.find((option) => {
        return option.name === "outdoor_temp_below";
      });
      if (
        typeof outdoorTempBelowOption !== "undefined" &&
        outdoorTempBelowOption.type === ApplicationCommandOptionType.Integer
      ) {
        foundAction.outdoorTempBelow = outdoorTempBelowOption.value;
        updatedItems.push({ name: "Outdoor Temp Below", value: outdoorTempBelowOption.value.toString(), inline: true });
      }
      const timeHourAfterOption = subcommandOption.options.find((option) => {
        return option.name === "time_hour_after";
      });
      if (
        typeof timeHourAfterOption !== "undefined" &&
        timeHourAfterOption.type === ApplicationCommandOptionType.Integer
      ) {
        foundAction.timeHourAfter = timeHourAfterOption.value;
        updatedItems.push({ name: "Time Hour After", value: timeHourAfterOption.value.toString(), inline: true });
      }
      const timeHourBeforeOption = subcommandOption.options.find((option) => {
        return option.name === "time_hour_before";
      });
      if (
        typeof timeHourBeforeOption !== "undefined" &&
        timeHourBeforeOption.type === ApplicationCommandOptionType.Integer
      ) {
        foundAction.timeHourBefore = timeHourBeforeOption.value;
        updatedItems.push({ name: "Time Hour Before", value: timeHourBeforeOption.value.toString(), inline: true });
      }
      const powerOption = subcommandOption.options.find((option) => {
        return option.name === "power";
      });
      if (typeof powerOption !== "undefined" && powerOption.type === ApplicationCommandOptionType.String) {
        switch (powerOption.value) {
          case "on":
            foundAction.on = true;
            break;
          case "off":
            foundAction.on = false;
          // No Default
        }
        updatedItems.push({ name: "Power", value: capitalize(powerOption.value), inline: true });
      }
      const modeOption = subcommandOption.options.find((option) => {
        return option.name === "mode";
      });
      if (
        typeof modeOption !== "undefined" &&
        modeOption.type === ApplicationCommandOptionType.String &&
        isAcMode(modeOption.value)
      ) {
        foundAction.mode = modeOption.value;
        updatedItems.push({ name: "Mode", value: capitalize(modeOption.value), inline: true });
      }
      const fanLevelOption = subcommandOption.options.find((option) => {
        return option.name === "fan_level";
      });
      if (
        typeof fanLevelOption !== "undefined" &&
        fanLevelOption.type === ApplicationCommandOptionType.String &&
        isFanLevel(fanLevelOption.value)
      ) {
        foundAction.fanLevel = fanLevelOption.value;
        updatedItems.push({ name: "Fan Level", value: capitalize(fanLevelOption.value), inline: true });
      }
      const temperatureOption = subcommandOption.options.find((option) => {
        return option.name === "temperature";
      });
      if (typeof temperatureOption !== "undefined" && temperatureOption.type === ApplicationCommandOptionType.Integer) {
        foundAction.targetTemperature = temperatureOption.value;
        updatedItems.push({ name: "Temperature", value: temperatureOption.value.toString(), inline: true });
      }
      const swingOption = subcommandOption.options.find((option) => {
        return option.name === "swing_type";
      });
      if (
        typeof swingOption !== "undefined" &&
        swingOption.type === ApplicationCommandOptionType.String &&
        isAcSwingMode(swingOption.value)
      ) {
        foundAction.swing = swingOption.value;
        updatedItems.push({ name: "Swing Mode", value: capitalize(swingOption.value), inline: true });
      }
      const lightOption = subcommandOption.options.find((option) => {
        return option.name === "light";
      });
      if (
        typeof lightOption !== "undefined" &&
        lightOption.type === ApplicationCommandOptionType.String &&
        isAcLightMode(lightOption.value)
      ) {
        foundAction.light = lightOption.value;
        updatedItems.push({ name: "Light", value: capitalize(lightOption.value), inline: true });
      }
      await db.update(sensiboActions).set(foundAction).where(eq(sensiboActions.id, actionId)).run();
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [resultEmbed("success", "Action Updated", "With the following changes:", updatedItems)],
        },
      };
    } catch (error) {
      console.error(error);
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [resultEmbed("error", "Error Updating Action", "Likely caused by a database issue. Check logs.")],
        },
      };
    }
  }
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [
        resultEmbed(
          "error",
          "Invalid Command Execution",
          "This command was not executed at the proper level, this is likely a bug.",
        ),
      ],
    },
  };
};

const handleActionsList: DiscordSubcommandRunner = async (subcommandOption, env) => {
  if (typeof subcommandOption.options === "undefined" || subcommandOption.options.length === 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed(
            "error",
            "Invalid Command Execution",
            "This command was not executed at the proper level, this is likely a bug.",
          ),
        ],
      },
    };
  }
  const podOption = subcommandOption.options.find((option) => {
    return option.name === "pod";
  });
  if (typeof podOption !== "undefined" && podOption.type === ApplicationCommandOptionType.String) {
    try {
      const actionOption = subcommandOption.options.find((option) => {
        return option.name === "action";
      });
      const listedActions: APIEmbed[] = [];
      const db = getDrizzle(env.DB);
      if (typeof actionOption !== "undefined" && actionOption.type === ApplicationCommandOptionType.String) {
        const actionId = Number.parseInt(actionOption.value, 10);
        const foundAction = await db.query.sensiboActions.findFirst({
          where: (action) => {
            return eq(action.id, actionId);
          },
        });
        if (typeof foundAction === "undefined") {
          throw new Error("Action Not Found");
        }
        const actionFields: APIEmbedField[] = [];
        actionFields.push({ name: "Enabled", value: foundAction.enabled ? "True" : "False", inline: true });
        if (foundAction.currentMode !== null) {
          actionFields.push({ name: "Current Mode", value: capitalize(foundAction.currentMode), inline: true });
        }
        if (foundAction.roomTempAbove !== null) {
          actionFields.push({ name: "Room Temp Above", value: foundAction.roomTempAbove.toString(), inline: true });
        }
        if (foundAction.roomTempBelow !== null) {
          actionFields.push({ name: "Room Temp Below", value: foundAction.roomTempBelow.toString(), inline: true });
        }
        if (foundAction.outdoorTempAbove !== null) {
          actionFields.push({
            name: "Outdoor Temp Above",
            value: foundAction.outdoorTempAbove.toString(),
            inline: true,
          });
        }
        if (foundAction.outdoorTempBelow !== null) {
          actionFields.push({
            name: "Outdoor Temp Below",
            value: foundAction.outdoorTempBelow.toString(),
            inline: true,
          });
        }
        if (foundAction.timeHourAfter !== null) {
          actionFields.push({ name: "Time Hour After", value: foundAction.timeHourAfter.toString(), inline: true });
        }
        if (foundAction.timeHourBefore !== null) {
          actionFields.push({ name: "Time Hour Before", value: foundAction.timeHourBefore.toString(), inline: true });
        }
        if (foundAction.on !== null) {
          actionFields.push({ name: "Power", value: foundAction.on ? "On" : "Off", inline: true });
        }
        if (foundAction.mode !== null) {
          actionFields.push({ name: "Mode", value: capitalize(foundAction.mode), inline: true });
        }
        if (foundAction.fanLevel !== null) {
          actionFields.push({ name: "Fan Level", value: capitalize(foundAction.fanLevel), inline: true });
        }
        if (foundAction.targetTemperature !== null) {
          actionFields.push({ name: "Temperature", value: foundAction.targetTemperature.toString(), inline: true });
        }
        if (foundAction.swing !== null) {
          actionFields.push({ name: "Swing", value: capitalize(foundAction.swing), inline: true });
        }
        if (foundAction.light !== null) {
          actionFields.push({ name: "Light", value: capitalize(foundAction.light), inline: true });
        }
        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            embeds: [
              resultEmbed("success", `${foundAction.priority}. ${foundAction.name}`, "Action Details", actionFields),
            ],
          },
        };
      } else {
        let foundActions = await db.query.sensiboActions.findMany({
          where: (action) => {
            return eq(action.podId, podOption.value);
          },
          orderBy: (action, { asc }) => {
            return asc(action.priority);
          },
          limit: 25,
        });
        if (foundActions.length === 0) {
          return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              embeds: [resultEmbed("warn", "No Actions Found", "None were found for this Pod.")],
            },
          };
        }
        const MAX_EMBED = 25;
        if (foundActions.length > MAX_EMBED) {
          listedActions.push(
            resultEmbed("warn", "Incomplete List", "Too many actions to show, check Cloudflare Dashboard."),
          );
          foundActions = foundActions.slice(0, MAX_EMBED);
        }
        for (const foundAction of foundActions) {
          const actionEmbed: APIEmbed = {
            title: `${foundAction.priority}. ${foundAction.name}`,
          };
          const actionFields: APIEmbedField[] = [];
          actionFields.push({ name: "Enabled", value: foundAction.enabled ? "True" : "False", inline: true });
          if (foundAction.currentMode !== null) {
            actionFields.push({ name: "Current Mode", value: capitalize(foundAction.currentMode), inline: true });
          }
          if (foundAction.roomTempAbove !== null) {
            actionFields.push({ name: "Room Temp Above", value: foundAction.roomTempAbove.toString(), inline: true });
          }
          if (foundAction.roomTempBelow !== null) {
            actionFields.push({ name: "Room Temp Below", value: foundAction.roomTempBelow.toString(), inline: true });
          }
          if (foundAction.outdoorTempAbove !== null) {
            actionFields.push({
              name: "Outdoor Temp Above",
              value: foundAction.outdoorTempAbove.toString(),
              inline: true,
            });
          }
          if (foundAction.outdoorTempBelow !== null) {
            actionFields.push({
              name: "Outdoor Temp Below",
              value: foundAction.outdoorTempBelow.toString(),
              inline: true,
            });
          }
          if (foundAction.timeHourAfter !== null) {
            actionFields.push({ name: "Time Hour After", value: foundAction.timeHourAfter.toString(), inline: true });
          }
          if (foundAction.timeHourBefore !== null) {
            actionFields.push({ name: "Time Hour Before", value: foundAction.timeHourBefore.toString(), inline: true });
          }
          if (foundAction.on !== null) {
            actionFields.push({ name: "Power", value: foundAction.on ? "On" : "Off", inline: true });
          }
          if (foundAction.mode !== null) {
            actionFields.push({ name: "Mode", value: capitalize(foundAction.mode), inline: true });
          }
          if (foundAction.fanLevel !== null) {
            actionFields.push({ name: "Fan Level", value: capitalize(foundAction.fanLevel), inline: true });
          }
          if (foundAction.targetTemperature !== null) {
            actionFields.push({ name: "Temperature", value: foundAction.targetTemperature.toString(), inline: true });
          }
          if (foundAction.swing !== null) {
            actionFields.push({ name: "Swing", value: capitalize(foundAction.swing), inline: true });
          }
          if (foundAction.light !== null) {
            actionFields.push({ name: "Light", value: capitalize(foundAction.light), inline: true });
          }
          actionEmbed.fields = actionFields;
          actionEmbed.color = 0x57f287;
          listedActions.push(actionEmbed);
        }
        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            embeds: listedActions,
          },
        };
      }
    } catch (error) {
      console.error(error);
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [resultEmbed("error", "Error Listing Action(s)", "Likely caused by a database issue. Check logs.")],
        },
      };
    }
  }
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [
        resultEmbed(
          "error",
          "Invalid Command Execution",
          "This command was not executed at the proper level, this is likely a bug.",
        ),
      ],
    },
  };
};

const handleActionsRemove: DiscordSubcommandRunner = async (subcommandOption, env) => {
  if (typeof subcommandOption.options === "undefined" || subcommandOption.options.length === 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed(
            "error",
            "Invalid Command Execution",
            "This command was not executed at the proper level, this is likely a bug.",
          ),
        ],
      },
    };
  }
  const podOption = subcommandOption.options.find((option) => {
    return option.name === "pod";
  });
  const actionOption = subcommandOption.options.find((option) => {
    return option.name === "action";
  });
  if (
    typeof podOption !== "undefined" &&
    podOption.type === ApplicationCommandOptionType.String &&
    typeof actionOption !== "undefined" &&
    actionOption.type === ApplicationCommandOptionType.String
  ) {
    try {
      const actionId = Number.parseInt(actionOption.value, 10);
      const db = getDrizzle(env.DB);
      const foundAction = await db.query.sensiboActions.findFirst({
        where: (action) => {
          return eq(action.id, actionId);
        },
      });
      if (typeof foundAction === "undefined") {
        throw new Error(`Action ID ${actionOption.value} Not Found`);
      }
      await db.delete(sensiboActions).where(eq(sensiboActions.id, actionId)).run();
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [resultEmbed("success", "Action Removed", "It's no longer in the database.")],
        },
      };
    } catch (error) {
      console.error(error);
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [resultEmbed("error", "Error Removing Action", "Likely caused by a database issue. Check logs.")],
        },
      };
    }
  }
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [
        resultEmbed(
          "error",
          "Invalid Command Execution",
          "This command was not executed at the proper level, this is likely a bug.",
        ),
      ],
    },
  };
};

const handleConfig: DiscordSubcommandRunner = async (subcommandOption, env) => {
  if (typeof subcommandOption.options === "undefined" || subcommandOption.options.length === 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed("warn", "No Config Options Specified", "Please specify at least one config option to change."),
        ],
      },
    };
  }
  const changedItems: APIEmbedField[] = [];
  const currentConfig = await get(env, "config_sensibo");
  const cutoffHourOption = subcommandOption.options.find((option) => {
    return option.name === "cutoff_hour";
  });
  if (typeof cutoffHourOption !== "undefined" && cutoffHourOption.type === ApplicationCommandOptionType.Integer) {
    currentConfig.cutoffHour = cutoffHourOption.value;
    changedItems.push({ name: "Cutoff Hour", value: cutoffHourOption.value.toString(), inline: true });
  }
  await set(env, "config_sensibo", currentConfig);
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [
        resultEmbed("success", "Sensibo Configuration Updated", "The following values were changed.", changedItems),
      ],
    },
  };
};

const handlePodsAdd: DiscordSubcommandRunner = async (subcommandOption, env) => {
  if (typeof subcommandOption.options === "undefined" || subcommandOption.options.length === 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed(
            "error",
            "Invalid Command Execution",
            "This command was not executed at the proper level, this is likely a bug.",
          ),
        ],
      },
    };
  }
  const podOption = subcommandOption.options.find((option) => {
    return option.name === "pod";
  });
  if (typeof podOption !== "undefined" && podOption.type === ApplicationCommandOptionType.String) {
    try {
      const pod = await getPod(env, podOption.value);
      if (pod.status === "success") {
        const db = getDrizzle(env.DB);
        const newPod: NewSensiboPod = {
          id: pod.result.id,
          name: pod.result.room.name,
        };
        await db.insert(sensiboPods).values(newPod).execute();
        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            embeds: [resultEmbed("success", "New Pod Added", `Added "${pod.result.room.name}" to list of pods.`)],
          },
        };
      } else {
        throw new Error("Could not insert new Pod.");
      }
    } catch (error) {
      console.error(error);
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [resultEmbed("error", "Error Adding New Pod", "Likely caused by a database issue. Check logs.")],
        },
      };
    }
  }
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [
        resultEmbed(
          "error",
          "Invalid Command Execution",
          "This command was not executed at the proper level, this is likely a bug.",
        ),
      ],
    },
  };
};

const handlePodsRemove: DiscordSubcommandRunner = async (subcommandOption, env) => {
  if (typeof subcommandOption.options === "undefined" || subcommandOption.options.length === 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed(
            "error",
            "Invalid Command Execution",
            "This command was not executed at the proper level, this is likely a bug.",
          ),
        ],
      },
    };
  }
  const podOption = subcommandOption.options.find((option) => {
    return option.name === "pod";
  });
  if (typeof podOption !== "undefined" && podOption.type === ApplicationCommandOptionType.String) {
    try {
      const db = getDrizzle(env.DB);
      const existingPod = await db.query.sensiboPods.findFirst({
        where: (pod) => {
          return eq(pod.id, podOption.value);
        },
      });
      if (typeof existingPod === "undefined") {
        throw new Error("Pod Not Found.");
      }
      await db.delete(sensiboPods).where(eq(sensiboPods.id, existingPod.id));
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [
            resultEmbed("success", "Pod Removed", `Successfully removed "${existingPod.name}" from stored Pods.`),
          ],
        },
      };
    } catch (error) {
      console.error(error);
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [resultEmbed("error", "Error Deleting Pod", "Likely caused by a database issue. Check logs.")],
        },
      };
    }
  }
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [
        resultEmbed(
          "error",
          "Invalid Command Execution",
          "This command was not executed at the proper level, this is likely a bug.",
        ),
      ],
    },
  };
};

const handleState: DiscordSubcommandRunner = async (subcommandOption, env, interaction) => {
  if (typeof subcommandOption.options === "undefined" || subcommandOption.options.length === 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed(
            "error",
            "Invalid Command Execution",
            "This command was not executed at the proper level, this is likely a bug.",
          ),
        ],
      },
    };
  }
  const podOption = subcommandOption.options.find((option) => {
    return option.name === "pod";
  });
  if (typeof podOption !== "undefined" && podOption.type === ApplicationCommandOptionType.String) {
    try {
      const acState: Partial<AcState> = {};
      const powerOption = subcommandOption.options.find((option) => {
        return option.name === "power";
      });
      if (typeof powerOption !== "undefined" && powerOption.type === ApplicationCommandOptionType.String) {
        switch (powerOption.value) {
          case "on":
            acState.on = true;
            break;
          case "off":
            acState.on = false;
            break;
          // No Default
        }
      }
      const modeOption = subcommandOption.options.find((option) => {
        return option.name === "mode";
      });
      if (
        typeof modeOption !== "undefined" &&
        modeOption.type === ApplicationCommandOptionType.String &&
        isAcMode(modeOption.value)
      ) {
        acState.mode = modeOption.value;
      }
      const fanOption = subcommandOption.options.find((option) => {
        return option.name === "fan_level";
      });
      if (
        typeof fanOption !== "undefined" &&
        fanOption.type === ApplicationCommandOptionType.String &&
        isFanLevel(fanOption.value)
      ) {
        acState.fanLevel = fanOption.value;
      }
      const tempOption = subcommandOption.options.find((option) => {
        return option.name === "temperature";
      });
      if (typeof tempOption !== "undefined" && tempOption.type === ApplicationCommandOptionType.Integer) {
        acState.targetTemperature = tempOption.value;
      }
      const swingOption = subcommandOption.options.find((option) => {
        return option.name === "swing_type";
      });
      if (
        typeof swingOption !== "undefined" &&
        swingOption.type === ApplicationCommandOptionType.String &&
        isAcSwingMode(swingOption.value)
      ) {
        acState.swing = swingOption.value;
      }
      const lightOption = subcommandOption.options.find((option) => {
        return option.name === "light";
      });
      if (
        typeof lightOption !== "undefined" &&
        lightOption.type === ApplicationCommandOptionType.String &&
        isAcLightMode(lightOption.value)
      ) {
        acState.light = lightOption.value;
      }
      if (
        typeof acState.on === "undefined" &&
        typeof acState.mode === "undefined" &&
        typeof acState.fanLevel === "undefined" &&
        typeof acState.targetTemperature === "undefined" &&
        typeof acState.swing === "undefined" &&
        typeof acState.light === "undefined"
      ) {
        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            embeds: [resultEmbed("error", "No A/C Changes", "At least one change to the A/C State must be specified")],
          },
        };
      }
      await env.QUEUE.send({
        method: "setAcState",
        params: {
          acState,
          interactionToken: interaction.token,
          podId: podOption.value,
        },
      });

      return {
        type: InteractionResponseType.DeferredChannelMessageWithSource,
      };
    } catch (error) {
      console.error(error);
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [
            resultEmbed("error", "Unable to set A/C State", "Likely caused by a database or API error, check logs."),
          ],
        },
      };
    }
  }
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [
        resultEmbed(
          "error",
          "Invalid Command Execution",
          "This command was not executed at the proper level, this is likely a bug.",
        ),
      ],
    },
  };
};

const run: DiscordCommandRunner = async (interaction, env) => {
  if (typeof interaction.data.options === "undefined" || interaction.data.options.length === 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed(
            "error",
            "Invalid Command Execution",
            "This command was not executed at the proper level, this is likely a bug.",
          ),
        ],
      },
    };
  } else if (interaction.data.options[0].type === ApplicationCommandOptionType.SubcommandGroup) {
    if (interaction.data.options[0].options.length === 0) {
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [
            resultEmbed(
              "error",
              "Invalid Command Execution",
              "This command was not executed at the proper level, this is likely a bug.",
            ),
          ],
        },
      };
    }
    switch (interaction.data.options[0].name) {
      case "actions": {
        const actionsOption = interaction.data.options[0].options[0];
        switch (actionsOption.name) {
          case "add":
            return await handleActionsAdd(actionsOption, env, interaction);
          case "clear":
            return await handleActionsClear(actionsOption, env, interaction);
          case "edit":
            return await handleActionsEdit(actionsOption, env, interaction);
          case "list":
            return await handleActionsList(actionsOption, env, interaction);
          case "remove":
            return await handleActionsRemove(actionsOption, env, interaction);
          default:
            return {
              type: InteractionResponseType.ChannelMessageWithSource,
              data: {
                embeds: [
                  resultEmbed(
                    "error",
                    "Invalid Command Execution",
                    "This command was not executed at the proper level, this is likely a bug.",
                  ),
                ],
              },
            };
        }
      }
      case "pods": {
        const podsOption = interaction.data.options[0].options[0];
        switch (podsOption.name) {
          case "add":
            return await handlePodsAdd(podsOption, env, interaction);
          case "remove":
            return await handlePodsRemove(podsOption, env, interaction);
          default:
            return {
              type: InteractionResponseType.ChannelMessageWithSource,
              data: {
                embeds: [
                  resultEmbed(
                    "error",
                    "Invalid Command Execution",
                    "This command was not executed at the proper level, this is likely a bug.",
                  ),
                ],
              },
            };
        }
      }
      default:
        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            embeds: [
              resultEmbed(
                "error",
                `Command "${interaction.data.options[0].name}" not found`,
                "This command was not executed at the proper level, this is likely a bug.",
              ),
            ],
          },
        };
    }
  } else if (interaction.data.options[0].type === ApplicationCommandOptionType.Subcommand) {
    switch (interaction.data.options[0].name) {
      case "config": {
        const configOptions = interaction.data.options[0];
        return await handleConfig(configOptions, env, interaction);
      }
      case "state": {
        const stateOptions = interaction.data.options[0];
        return await handleState(stateOptions, env, interaction);
      }
      default:
        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            embeds: [
              resultEmbed(
                "error",
                `Command "${interaction.data.options[0].name}" not found`,
                "This command was not executed at the proper level, this is likely a bug.",
              ),
            ],
          },
        };
    }
  } else {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          resultEmbed(
            "error",
            "Invalid Command Execution",
            "This command was not executed at the proper level, this is likely a bug.",
          ),
        ],
      },
    };
  }
};

export default run;
