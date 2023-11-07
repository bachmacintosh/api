export default function capitalize(words: string): string {
  if (!words) {
    return "";
  }
  const HIGH_UNICODE_CODE_POINT = 0xffff;
  const INDEX_02 = 2;
  const firstCodePoint = words.codePointAt(0);
  let index = 1;
  if (typeof firstCodePoint !== "undefined") {
    index = firstCodePoint > HIGH_UNICODE_CODE_POINT ? INDEX_02 : 1;
    return String.fromCodePoint(firstCodePoint).toUpperCase() + words.slice(index);
  }
  return words.charAt(0).toUpperCase() + words.slice(1);
}
