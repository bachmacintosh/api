export default function mentionUser(snowflake: string): string {
  return `<@${snowflake}>`;
}
