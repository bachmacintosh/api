import type { Env, ProcessGitHubWebhookParams, QueuedEmbed } from "../../../types";
import {
  handleCodeScanningAlert,
  handleDependabotAlert,
  handleDiscussion,
  handleDiscussionComment,
  handleIssueComment,
  handleIssues,
  handleMeta,
  handlePing,
  handlePullRequest,
  handlePush,
  handleRepositoryAdvisory,
  // Secret Scanning
  handleStar,
} from "../../../github/webhooks";

export default function handleProcessGitHubWebhook(env: Env, params: ProcessGitHubWebhookParams): QueuedEmbed | null {
  switch (params.event) {
    case "code_scanning_alert":
      return handleCodeScanningAlert(params.payload, env);
    case "dependabot_alert":
      return handleDependabotAlert(params.payload, env);
    case "discussion":
      return handleDiscussion(params.payload, env);
    case "discussion_comment":
      return handleDiscussionComment(params.payload, env);
    case "issue_comment":
      return handleIssueComment(params.payload, env);
    case "issues":
      return handleIssues(params.payload, env);
    case "meta":
      return handleMeta(params.payload, env);
    case "ping":
      return handlePing(params.payload, env);
    case "pull_request":
      return handlePullRequest(params.payload, env);
    case "push":
      return handlePush(params.payload, env);
    case "repository_advisory":
      return handleRepositoryAdvisory(params.payload, env);
    case "secret_scanning_alert":
      return null;
    case "secret_scanning_alert_location":
      return null;
    case "star":
      return handleStar(params.payload, env);
  }
}
