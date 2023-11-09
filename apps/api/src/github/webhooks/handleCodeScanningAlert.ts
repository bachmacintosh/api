import { type GitHubWebhookEventRunner, type RESTPostAPIChannelMessageJSONBody, Routes } from "../../types";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import { StatusError } from "itty-router";
import actionRow from "../../discord/components/actionRow";
import linkButton from "../../discord/components/buttons/linkButton";
import mentionUser from "../../discord/content/mentionUser";
import resultEmbed from "../../discord/embeds/resultEmbed";

const handleCodeScanningAlert: GitHubWebhookEventRunner<"code_scanning_alert"> = async (event, env, rest) => {
  switch (event.action) {
    case "appeared_in_branch":
      await rest.post(Routes.channelMessages(env.DISCORD_CHANNEL_GITHUB), {
        body: {
          content: mentionUser(env.DISCORD_MENTION_ID),
          embeds: [resultEmbed("error", `Code Scanning Alert Appeared in ${event.repository.full_name}`)],
          components: [actionRow(linkButton("View Alert", event.alert.url))],
        } satisfies RESTPostAPIChannelMessageJSONBody,
      });
      break;
    case "closed_by_user": {
      throw new Error('Not implemented yet: "closed_by_user" case');
    }
    case "created": {
      throw new Error('Not implemented yet: "created" case');
    }
    case "fixed": {
      throw new Error('Not implemented yet: "fixed" case');
    }
    case "reopened": {
      throw new Error('Not implemented yet: "reopened" case');
    }
    case "reopened_by_user": {
      throw new Error('Not implemented yet: "reopened_by_user" case');
    }
    default: {
      throw new StatusError(HttpStatusCode.NotImplemented, "Unknown Code Scanning Alert Event Action");
    }
  }
};

export default handleCodeScanningAlert;
