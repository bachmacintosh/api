export default function ellipsize(text: string, length = 100): string {
  const ELLIPSIS_LENGTH = 3;
  if (text.length <= length) {
    return text;
  }
  return `${text.substring(0, length - ELLIPSIS_LENGTH)}...`;
}
