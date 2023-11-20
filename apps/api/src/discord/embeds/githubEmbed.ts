import { type APIEmbed, type APIEmbedField, DISCORD_MAX, type DiscordErrorLevel, type User } from "../../types";
import type { Paragraph, Root } from "mdast-util-from-markdown/lib";
import ellipsize from "../../util/ellipsize";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfm } from "micromark-extension-gfm";
import { gfmFromMarkdown } from "mdast-util-gfm";
import maskedLink from "../content/maskedLink";
import { toMarkdown } from "mdast-util-to-markdown";

const cleanUpMarkdown = (tree: Root): Root => {
  const newRoot: Root = {
    type: "root",
    children: [],
  };
  tree.children.forEach((child) => {
    switch (child.type) {
      case "image":
      case "imageReference":
        newRoot.children.push({ type: "paragraph", children: [{ type: "text", value: "(Image)" }] });
        break;
      case "paragraph":
        {
          const newParagraph: Paragraph = {
            type: "paragraph",
            children: [],
          };
          child.children.forEach((grandChild) => {
            switch (grandChild.type) {
              case "image":
              case "imageReference":
                newParagraph.children.push({ type: "text", value: "(Image)" });
                break;
              default:
                newParagraph.children.push(grandChild);
            }
          });
          newRoot.children.push(newParagraph);
        }
        break;
      case "table":
        newRoot.children.push({ type: "paragraph", children: [{ type: "text", value: "(Table)" }] });
        break;
      default:
        newRoot.children.push(child);
    }
  });
  return newRoot;
};

const githubEmbed = ({
  description,
  fields,
  hasMarkdownDescription,
  level,
  title,
  url,
  user,
}: {
  description: string;
  title: string;
  fields?: APIEmbedField[];
  hasMarkdownDescription?: boolean;
  level?: DiscordErrorLevel;
  url?: string;
  user?: User;
}): APIEmbed => {
  const colors = {
    error: 0xed4245,
    warn: 0xfee75c,
    success: 0x57f287,
    info: 0x95a5a6,
  } as const;
  const trimmedTitle = ellipsize(title, DISCORD_MAX.EMBED.TITLE);

  const embed: APIEmbed = {};
  if (typeof url === "undefined") {
    embed.title = trimmedTitle;
  } else {
    embed.title = maskedLink(trimmedTitle, url);
  }
  if (typeof user !== "undefined") {
    embed.author = {
      name: user.login,
      url: user.html_url,
      icon_url: user.avatar_url,
    };
  }
  if (typeof hasMarkdownDescription !== "undefined" && hasMarkdownDescription) {
    const descriptionTree = fromMarkdown(description, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] });
    const newRoot = cleanUpMarkdown(descriptionTree);
    const newDescription = ellipsize(toMarkdown(newRoot), DISCORD_MAX.EMBED.DESCRIPTION);
    embed.description = newDescription;
  } else {
    embed.description = description;
  }
  if (typeof level === "undefined") {
    embed.color = colors.info;
  } else {
    embed.color = colors[level];
  }
  if (typeof fields !== "undefined") {
    embed.fields = fields;
  }
  return embed;
};

export default githubEmbed;
