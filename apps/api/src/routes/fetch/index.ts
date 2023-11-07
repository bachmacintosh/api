import { type IRequestStrict, Router, error } from "itty-router";
import type { CF } from "../../types";
import { HttpStatusCode } from "@bachmacintosh/api-types";
import discordRouter from "./discord";

const fetchRoute = Router<IRequestStrict, CF>()
  .all("/discord/*", discordRouter.handle)
  .all("*", () => {
    return error(HttpStatusCode.NotFound);
  });

export default fetchRoute;
