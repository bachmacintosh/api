import { ApplicationCommandOptionType, type RESTPostAPIApplicationGuildCommandsJSONBody } from "../../../types";

const data: RESTPostAPIApplicationGuildCommandsJSONBody = {
  name: "steam",
  description: "Control Steam Game Monitoring",
  options: [
    {
      name: "start",
      description: "Start Steam Game Monitoring",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "stop",
      description: "Stop Steam Game Monitoring",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
};

export default data;
