import {
  ApplicationCommandOptionType,
  type DiscordCommandRunner,
  type DiscordSubcommandRunner,
  InteractionResponseType,
} from "../../../types";
import resultEmbed from "../../embeds/resultEmbed";
import { set } from "../../../db/kv";

const handleStart: DiscordSubcommandRunner = async (_subcommandOption, env) => {
  try {
    await set(env, "config_steam", { status: "running" });
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [resultEmbed("success", "Steam Monitor Now Running", "It will update every 10 minutes.")],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [resultEmbed("error", "Couldn't Start Steam Game Monitor", "Likely a Cloudflare error, check logs.")],
      },
    };
  }
};

const handleStop: DiscordSubcommandRunner = async (_subcommandOption, env) => {
  try {
    await set(env, "config_steam", { status: "stopped" });
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [resultEmbed("success", "Steam Monitor Now Stopped", "It will not run until started again.")],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [resultEmbed("error", "Couldn't Stop Steam Game Monitor", "Likely a Cloudflare error, check logs.")],
      },
    };
  }
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
  } else if (interaction.data.options[0].type === ApplicationCommandOptionType.Subcommand) {
    const subcommandOptions = interaction.data.options[0];
    switch (interaction.data.options[0].name) {
      case "start":
        return await handleStart(subcommandOptions, env, interaction);
      case "stop":
        return await handleStop(subcommandOptions, env, interaction);
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
