import type { APIEmbed, APIEmbedField, DiscordErrorLevel } from "../../types";

const resultEmbed = (level: DiscordErrorLevel, result: string, reason?: string, fields?: APIEmbedField[]): APIEmbed => {
  const colors = {
    error: 0xed4245,
    warn: 0xfee75c,
    success: 0x57f287,
    info: 0x95a5a6,
  } as const;
  const embed: APIEmbed = {
    title: result,
    description: reason,
    color: colors[level],
  };
  if (typeof fields !== "undefined") {
    embed.fields = fields;
  }
  return embed;
};

export default resultEmbed;
