import type { GitHubWebhookEventRunner } from "../../types";
import githubEmbed from "../../discord/embeds/githubEmbed";

const handleIssues: GitHubWebhookEventRunner<"issues"> = (event) => {
  switch (event.action) {
    case "assigned":
      if (
        typeof event.assignee !== "undefined" &&
        event.assignee !== null &&
        event.assignee.login === "bachmacintosh"
      ) {
        return {
          needsMention: true,
          embed: githubEmbed({
            title: `Issue #${event.issue.number} Assigned: ${event.issue.title}`,
            description: event.issue.body ?? "",
            hasMarkdownDescription: true,
            url: event.issue.html_url,
            user: event.sender,
          }),
        };
      }
      return null;
    case "closed":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `Issue #${event.issue.number} Closed: ${event.issue.title}`,
          description: `Issue was closed for the following reason: ${event.issue.state_reason ?? "Unknown"}`,
          hasMarkdownDescription: true,
          url: event.issue.html_url,
          user: event.sender,
        }),
      };
    case "locked":
      return {
        needsMention: false,
        embed: githubEmbed({
          title: `Issue #${event.issue.number} Locked: ${event.issue.title}`,
          description: `Issue was locked for the following reason: ${event.issue.active_lock_reason ?? "Unknown"}`,
          hasMarkdownDescription: true,
          url: event.issue.html_url,
          user: event.sender,
        }),
      };
    case "opened":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `New Issue #${event.issue.number}: ${event.issue.title}`,
          description: event.issue.body ?? "",
          hasMarkdownDescription: true,
          url: event.issue.html_url,
          user: event.sender,
        }),
      };
    case "reopened":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `Issue #${event.issue.number} Reopened: ${event.issue.title}`,
          description: event.issue.body ?? "",
          hasMarkdownDescription: true,
          url: event.issue.html_url,
          user: event.sender,
        }),
      };
    case "unlocked":
      return {
        needsMention: true,
        embed: githubEmbed({
          title: `Issue #${event.issue.number} Unlocked: ${event.issue.title}`,
          description: "Issue is once again open for discussion.",
          hasMarkdownDescription: true,
          url: event.issue.html_url,
          user: event.sender,
        }),
      };
    default:
      return null;
  }
};

export default handleIssues;
