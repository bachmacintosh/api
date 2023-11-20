import { type IRequestStrict, Router, StatusError } from "itty-router";
import type { CF } from "../../../types";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import handleWebhook from "../../../github/handleWebhook";
import verifyGithubWebhook from "../../../github/verifyGithubWebhook";

const githubRouter = Router<IRequestStrict, CF>({ base: "/github" }).post("/webhook", async (request, env) => {
  const isAuthorized = await verifyGithubWebhook(request, env.GITHUB_WEBHOOK_SECRET);
  if (!isAuthorized) {
    throw new StatusError(HttpStatusCode.Unauthorized, "Unauthorized, nice try.");
  }
  return await handleWebhook(request, env);
});

export default githubRouter;
