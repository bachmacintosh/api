import { type APIActionRowComponent, type APIMessageActionRowComponent, ComponentType } from "../../types";

export default function actionRow(
  ...components: APIMessageActionRowComponent[]
): APIActionRowComponent<APIMessageActionRowComponent> {
  const ACTION_ROW_MAX_LENGTH = 5;
  if (components.length > ACTION_ROW_MAX_LENGTH) {
    throw new Error("Maximum of 5 items per Action Row exceeded");
  }
  return {
    type: ComponentType.ActionRow,
    components,
  };
}
