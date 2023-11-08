import type { DiscordCommand } from "../../types";
import sensibo from "./sensibo";
import steam from "./steam";

const commands: DiscordCommand[] = [sensibo, steam];

export default commands;
