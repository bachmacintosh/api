import {
  type APIApplicationCommandOptionChoice,
  ApplicationCommandOptionType,
  type DiscordAutocompleteRunner,
  type DiscordAutocompleteSubcommandHandler,
  type Env,
  InteractionResponseType,
} from "../../../types";
import getAllPods from "../../../sensibo/getAllPods";
import getDrizzle from "../../../db/d1";

const handleActions: DiscordAutocompleteSubcommandHandler = async (actionsOptions, env) => {
  if (typeof actionsOptions.options !== "undefined") {
    const focusedOption = actionsOptions.options.find((option) => {
      return option.type === ApplicationCommandOptionType.String && option.focused === true;
    });
    if (typeof focusedOption !== "undefined" && focusedOption.type === ApplicationCommandOptionType.String) {
      switch (focusedOption.name) {
        case "pod": {
          const choices = await getExistingPods(env);
          return { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data: { choices } };
        }
        case "action": {
          const podArgument = actionsOptions.options.find((option) => {
            return option.type === ApplicationCommandOptionType.String && option.name === "pod";
          });
          if (typeof podArgument !== "undefined" && podArgument.type === ApplicationCommandOptionType.String) {
            const choices = await getActions(env, podArgument.value, focusedOption.value);
            return { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data: { choices } };
          }
          return { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data: { choices: [] } };
        }
        default:
      }
    }
  }
  return Promise.resolve({ type: InteractionResponseType.ApplicationCommandAutocompleteResult, data: { choices: [] } });
};

const handlePods: DiscordAutocompleteSubcommandHandler = async (podsOptions, env) => {
  if (typeof podsOptions.options !== "undefined") {
    const focusedOption = podsOptions.options.find((option) => {
      return option.type === ApplicationCommandOptionType.String && option.focused === true;
    });
    if (typeof focusedOption !== "undefined" && focusedOption.name === "pod") {
      switch (podsOptions.name) {
        case "add": {
          const choices = await getNewPods(env);
          return { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data: { choices } };
        }
        case "remove": {
          const choices = await getExistingPods(env);
          return { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data: { choices } };
        }
        default:
      }
    }
  }
  return Promise.resolve({ type: InteractionResponseType.ApplicationCommandAutocompleteResult, data: { choices: [] } });
};

const autocomplete: DiscordAutocompleteRunner = async (context, env) => {
  if (context.data.options.length > 0) {
    const sensiboOption = context.data.options[0];
    if (
      sensiboOption.type === ApplicationCommandOptionType.SubcommandGroup &&
      typeof sensiboOption.options !== "undefined" &&
      sensiboOption.options.length > 0
    ) {
      switch (sensiboOption.name) {
        case "actions": {
          const actionsOptions = sensiboOption.options[0];
          const response = await handleActions(actionsOptions, env);
          return response;
        }
        case "pods": {
          const podsOptions = sensiboOption.options[0];
          const response = await handlePods(podsOptions, env);
          return response;
        }
        default:
      }
    } else if (
      sensiboOption.type === ApplicationCommandOptionType.Subcommand &&
      typeof sensiboOption.options !== "undefined" &&
      sensiboOption.options.length > 0 &&
      sensiboOption.name === "state"
    ) {
      const focusedOption = sensiboOption.options.find((option) => {
        return option.type === ApplicationCommandOptionType.String && option.focused === true;
      });
      if (typeof focusedOption !== "undefined" && focusedOption.name === "pod") {
        const choices = await getExistingPods(env);
        return { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data: { choices } };
      }
    }
  }
  return {
    type: InteractionResponseType.ApplicationCommandAutocompleteResult,
    data: { choices: [] },
  };
};

async function getActions(
  env: Env,
  podId: string,
  likeString: string,
): Promise<APIApplicationCommandOptionChoice<string>[]> {
  const drizzle = getDrizzle(env.DB);
  const choices: APIApplicationCommandOptionChoice<string>[] = [];
  try {
    const actions = await drizzle.query.sensiboActions.findMany({
      where: (action, { and, eq, like }) => {
        return and(eq(action.podId, podId), like(action.name, `${likeString}%`));
      },
      orderBy: (action, { asc }) => {
        return asc(action.priority);
      },
      limit: 25,
    });
    actions.forEach((action) => {
      choices.push({ name: `${action.priority}. ${action.name}`, value: action.id.toString() });
    });
    return choices;
  } catch (error) {
    return choices;
  }
}

async function getExistingPods(env: Env): Promise<APIApplicationCommandOptionChoice<string>[]> {
  const drizzle = getDrizzle(env.DB);
  const choices: APIApplicationCommandOptionChoice<string>[] = [];
  try {
    const pods = await drizzle.query.sensiboPods.findMany({
      orderBy: (pod, { asc }) => {
        return asc(pod.name);
      },
      limit: 25,
    });
    pods.forEach((pod) => {
      choices.push({ name: pod.name, value: pod.id });
    });
    return choices;
  } catch (error) {
    return choices;
  }
}

async function getNewPods(env: Env): Promise<APIApplicationCommandOptionChoice<string>[]> {
  const choices: APIApplicationCommandOptionChoice<string>[] = [];
  const db = getDrizzle(env.DB);
  const existingPods = await db.query.sensiboPods.findMany();
  const sensiboPods = await getAllPods(env);
  sensiboPods.result.forEach((pod) => {
    const isExistingPod = existingPods.every((otherPod) => {
      return pod.id !== otherPod.id;
    });
    if (isExistingPod) {
      choices.push({ name: pod.room.name, value: pod.id });
    }
  });
  return choices;
}

export default autocomplete;
