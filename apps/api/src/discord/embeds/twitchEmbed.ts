import type { APIEmbed, APIEmbedField } from "../../types/discord";

const twitchEmbed = (title: string, description?: string, url?: string, fields?: APIEmbedField[]): APIEmbed => {
  return {
    title,
    description,
    url,
    fields,
    color: 0x9146ff,
  };
};

export default twitchEmbed;
