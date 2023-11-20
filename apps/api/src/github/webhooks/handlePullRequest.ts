import type { GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handlePullRequest: GitHubWebhookEventRunner<"pull_request"> = (event) => {
  switch (event.action) {
    case "assigned": {
      if (event.assignee.login === "bachmacintosh") {
        return {
          needsMention: true,
          embed: githubEmbed({
            title: `[${event.repository.name}] Assigned Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
            description: event.pull_request.body ?? "",
            hasMarkdownDescription: true,
            url: event.pull_request.html_url,
            user: event.sender,
            level: "warn",
          }),
        };
      }
      return null;
    }
    case "closed": {
      const closedOrMerged =
        typeof event.pull_request.merged === "undefined" && typeof event.pull_request.merged_by === "undefined"
          ? "Closed"
          : `Merged`;
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] ${closedOrMerged} Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
          description:
            typeof event.pull_request.merged === "undefined"
              ? `Merged into "${event.pull_request.base.ref}" branch`
              : "The Pull Request was closed by a user, and was not merged.",
          url: event.pull_request.html_url,
          user: event.sender,
          level:
            typeof event.pull_request.merged === "undefined" && typeof event.pull_request.merged_by === "undefined"
              ? "info"
              : "success",
        }),
      };
    }
    case "converted_to_draft":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Converted to Draft Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
          description: event.pull_request.body ?? "",
          hasMarkdownDescription: true,
          url: event.pull_request.html_url,
          user: event.sender,
        }),
      };
    case "locked":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Locked Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
          description: `Reason for Lock: ${event.pull_request.active_lock_reason ?? "<unknown>"}`,
          url: event.pull_request.html_url,
          user: event.sender,
        }),
      };
    case "opened":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] New Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
          description: event.pull_request.body ?? "",
          hasMarkdownDescription: true,
          url: event.pull_request.html_url,
          user: event.sender,
          level: "warn",
        }),
      };
    case "ready_for_review":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Ready to Review Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
          description: "Pull Request went from Draft to being ready to be reviewed.",
          url: event.pull_request.html_url,
          user: event.sender,
          level: "success",
        }),
      };
    case "reopened":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Reopened Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
          description: event.pull_request.body ?? "",
          hasMarkdownDescription: true,
          url: event.pull_request.html_url,
          user: event.sender,
          level: "warn",
        }),
      };
    case "review_request_removed":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Review Request Removed from Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
          description: event.pull_request.body ?? "",
          hasMarkdownDescription: true,
          url: event.pull_request.html_url,
          user: event.sender,
        }),
      };
    case "review_requested":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Review Requested on Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
          description: event.pull_request.body ?? "",
          hasMarkdownDescription: true,
          url: event.pull_request.html_url,
          user: event.sender,
        }),
      };
    case "unassigned":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `[${event.repository.name}] Assignment Changed for Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
          description: event.pull_request.body ?? "",
          hasMarkdownDescription: true,
          url: event.pull_request.html_url,
          user: event.sender,
        }),
      };
    case "unlocked":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `[${event.repository.name}] Unlocked Pull Request #${event.pull_request.number}: ${event.pull_request.title}`,
          description: event.pull_request.body ?? "",
          hasMarkdownDescription: true,
          url: event.pull_request.html_url,
          user: event.sender,
        }),
      };
    default:
      return null;
  }
};

export default handlePullRequest;
