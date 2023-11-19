import type { GitHubWebhookEventRunner } from "../../types";
import ellipsize from "../../util/ellipsize";
import githubEmbed from "../../discord/embeds/githubEmbed";
import maskedLink from "../../discord/content/maskedLink";

const handlePush: GitHubWebhookEventRunner<"push"> = (event) => {
  let title = `[${event.repository.name}:${event.base_ref}] `;
  if (event.commits.length === 0) {
    title += "Push with No Commits";
  } else if (event.commits.length === 1) {
    title += "1 New Commit";
  } else {
    title += `${event.commits.length} New Commits`;
  }
  let description = "";
  event.commits.forEach((commit) => {
    const COMMIT_SHA_TRIM = 7;
    const COMMIT_MESSAGE_TRIM = 48;
    description += `${maskedLink(
      `\`${commit.id.slice(0, COMMIT_SHA_TRIM)}\``,
      `https://github.com/${event.repository.full_name}/commit/${commit.id}`,
    )} ${ellipsize(commit.message, COMMIT_MESSAGE_TRIM)} - ${commit.author.name}\n`;
  });
  return {
    needsMention: false,
    embed: githubEmbed({ title, description, url: event.compare, user: event.sender }),
  };
};

export default handlePush;
