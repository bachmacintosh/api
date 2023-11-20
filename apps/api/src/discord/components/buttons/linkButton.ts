import { ButtonStyle, ComponentType, type DiscordButton } from "../../../types";

const linkButton: DiscordButton = (label, url) => {
  return {
    type: ComponentType.Button,
    style: ButtonStyle.Link,
    label,
    url,
  };
};

export default linkButton;
