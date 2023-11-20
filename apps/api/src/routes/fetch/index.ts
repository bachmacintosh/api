import { type IRequestStrict, Router, error } from "itty-router";
import type { CF } from "../../types";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import discordRouter from "./discord";
import githubRouter from "./github";

const fetchRoute = Router<IRequestStrict, CF>()
  .all("/discord/*", discordRouter.handle)
  .all("/github/*", githubRouter.handle)
  .all("*", () => {
    return error(HttpStatusCode.NotFound);
  });

export default fetchRoute;
