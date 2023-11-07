import {
  type APIApplicationCommandAutocompleteInteraction,
  type APIChatInputApplicationCommandInteraction,
  type APIInteraction,
  type APIInteractionResponse,
  type Env,
  InteractionResponseType,
  InteractionType,
} from "../types";
import { StatusError, json } from "itty-router";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import commands from "./commands";
import resultEmbed from "./embeds/resultEmbed";
import verifyDiscordRequest from "./verifyDiscordRequest";

export default async function handleInteraction(request: Request, env: Env): Promise<Response> {
  if (request.method === "POST") {
    const isAuthorized = await verifyDiscordRequest(request, env.DISCORD_BOT_PUBLIC_KEY);
    if (!isAuthorized) {
      throw new StatusError(HttpStatusCode.Unauthorized, "Unauthorized. Nice try.");
    }
    const body = await request.json();
    const interaction = body as APIInteraction;
    if (interaction.type === InteractionType.Ping) {
      const response: APIInteractionResponse = { type: InteractionResponseType.Pong };
      return json(response, { status: HttpStatusCode.Ok });
    } else if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
      const autocomplete = body as APIApplicationCommandAutocompleteInteraction;
      const foundAutocomplete = commands.find((cmd) => {
        return cmd.data.name === autocomplete.data.name;
      });
      if (typeof foundAutocomplete?.autocomplete === "undefined") {
        throw new StatusError(HttpStatusCode.NotFound);
      }
      const response = await foundAutocomplete.autocomplete(autocomplete, env);
      return json(response, { status: HttpStatusCode.Ok });
    } else if (interaction.type === InteractionType.ApplicationCommand) {
      const commandInteraction = body as APIChatInputApplicationCommandInteraction;
      const foundCommand = commands.find((cmd) => {
        return cmd.data.name === commandInteraction.data.name;
      });
      if (typeof foundCommand === "undefined") {
        const response: APIInteractionResponse = {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            embeds: [
              resultEmbed(
                "error",
                `Cammand "${commandInteraction.data.name}" Not Found`,
                "We weren't able to locate the requested command",
              ),
            ],
          },
        };
        return json(response, { status: HttpStatusCode.Ok });
      }
      const response = await foundCommand.run(commandInteraction, env);
      return json(response, { status: HttpStatusCode.Ok });
    } else {
      throw new StatusError(HttpStatusCode.NotFound);
    }
  } else {
    throw new StatusError(HttpStatusCode.MethodNotAllowed, "This endpoint only accepts POST requests.");
  }
}
