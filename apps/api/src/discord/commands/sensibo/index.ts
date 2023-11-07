import type { DiscordCommand } from "../../../types";
import autocomplete from "./autocomplete";
import data from "./data";
import run from "./run";

const sensibo: DiscordCommand = {
  autocomplete,
  data,
  run,
};

export default sensibo;
