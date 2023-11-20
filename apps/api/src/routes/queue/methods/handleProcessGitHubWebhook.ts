import type { ProcessGitHubWebhookParams, QueuedEmbed } from "../../../types";
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
  handleSecretScanningAlert,
  handleSecretScanningAlertLocation,
  handleStar,
} from "../../../github/webhooks";

export default function handleProcessGitHubWebhook(params: ProcessGitHubWebhookParams): QueuedEmbed | null {
  switch (params.event) {
    case "code_scanning_alert":
      return handleCodeScanningAlert(params.payload);
    case "dependabot_alert":
      return handleDependabotAlert(params.payload);
    case "discussion":
      return handleDiscussion(params.payload);
    case "discussion_comment":
      return handleDiscussionComment(params.payload);
    case "issue_comment":
      return handleIssueComment(params.payload);
    case "issues":
      return handleIssues(params.payload);
    case "meta":
      return handleMeta(params.payload);
    case "ping":
      return handlePing(params.payload);
    case "pull_request":
      return handlePullRequest(params.payload);
    case "push":
      return handlePush(params.payload);
    case "repository_advisory":
      return handleRepositoryAdvisory(params.payload);
    case "secret_scanning_alert":
      return handleSecretScanningAlert(params.payload);
    case "secret_scanning_alert_location":
      return handleSecretScanningAlertLocation(params.payload);
    case "star":
      return handleStar(params.payload);
  }
}
