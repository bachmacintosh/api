import type {
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandAutocompleteResponse,
  APIApplicationCommandInteractionDataSubcommandOption,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  RESTPostAPIApplicationGuildCommandsJSONBody,
} from "discord-api-types/v10";
import type { Env } from "./cloudflare";

export {
  APIVersion,
  ApplicationCommandOptionType,
  InteractionResponseType,
  InteractionType,
  Routes,
} from "discord-api-types/v10";

export interface DiscordCommand {
  data: RESTPostAPIApplicationGuildCommandsJSONBody;
  run: DiscordCommandRunner;
  autocomplete?: DiscordAutocompleteRunner;
}

export type DiscordAutocompleteRunner = (
  interaction: APIApplicationCommandAutocompleteInteraction,
  env: Env,
) => Promise<APIApplicationCommandAutocompleteResponse>;
export type DiscordAutocompleteSubcommandHandler = (
  subcommandOption: APIApplicationCommandInteractionDataSubcommandOption,
  env: Env,
) => Promise<APIApplicationCommandAutocompleteResponse>;

export type DiscordCommandRunner = (
  interaction: APIChatInputApplicationCommandInteraction,
  env: Env,
) => Promise<APIInteractionResponse>;
export type DiscordSubcommandRunner = (
  subcommandOption: APIApplicationCommandInteractionDataSubcommandOption,
  env: Env,
  interaction: APIChatInputApplicationCommandInteraction,
) => Promise<APIInteractionResponse>;

export type DiscordErrorLevel = "error" | "info" | "success" | "warn";

export type {
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandBasicOption,
  APIApplicationCommandOption,
  APIApplicationCommandOptionChoice,
  APIApplicationCommandSubcommandGroupOption,
  APIApplicationCommandSubcommandOption,
  APIChatInputApplicationCommandInteraction,
  APIEmbed,
  APIEmbedField,
  APIInteraction,
  APIInteractionResponse,
  APIInteractionResponseCallbackData,
  RESTGetAPIChannelMessagesResult,
  RESTPatchAPIWebhookWithTokenMessageJSONBody,
  RESTPostAPIApplicationGuildCommandsJSONBody,
  RESTPostAPIChannelMessagesBulkDeleteJSONBody,
  RESTPostAPIChannelMessageJSONBody,
  RESTPostAPIWebhookWithTokenJSONBody,
  RESTPutAPIApplicationGuildCommandsJSONBody,
} from "discord-api-types/v10";
