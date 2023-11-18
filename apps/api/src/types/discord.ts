import type {
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandAutocompleteResponse,
  APIApplicationCommandInteractionDataSubcommandOption,
  APIButtonComponent,
  APIChatInputApplicationCommandInteraction,
  APIEmbed,
  APIInteractionResponse,
  RESTPostAPIApplicationGuildCommandsJSONBody,
} from "discord-api-types/v10";
import type { Env } from "./cloudflare";

export const DISCORD_MAX = {
  EMBED: {
    TITLE: 256,
    DESCRIPTION: 200,
    FIELD: {
      NAME: 256,
      VALUE: 1024,
    },
    FIELDS: 25,
    FOOTER: {
      TEXT: 2048,
    },
    AUTHOR: {
      NAME: 256,
    },
    TOTAL_LENGTH: 6000,
  },
} as const;

export {
  APIVersion,
  ApplicationCommandOptionType,
  ButtonStyle,
  ComponentType,
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

export type DiscordButton = (label: string, customIdOrUrl: string) => APIButtonComponent;

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

export interface QueuedEmbed {
  embed: APIEmbed;
  needsMention: boolean;
}

export type {
  APIActionRowComponent,
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandBasicOption,
  APIApplicationCommandOption,
  APIApplicationCommandOptionChoice,
  APIApplicationCommandSubcommandGroupOption,
  APIApplicationCommandSubcommandOption,
  APIButtonComponent,
  APIChatInputApplicationCommandInteraction,
  APIEmbed,
  APIEmbedField,
  APIInteraction,
  APIInteractionResponse,
  APIInteractionResponseCallbackData,
  APIMessageActionRowComponent,
  APIMessageComponent,
  RESTGetAPIChannelMessagesResult,
  RESTPatchAPIWebhookWithTokenMessageJSONBody,
  RESTPostAPIApplicationGuildCommandsJSONBody,
  RESTPostAPIChannelMessagesBulkDeleteJSONBody,
  RESTPostAPIChannelMessageJSONBody,
  RESTPostAPIWebhookWithTokenJSONBody,
  RESTPutAPIApplicationGuildCommandsJSONBody,
} from "discord-api-types/v10";
