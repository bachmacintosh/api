/* eslint-disable @typescript-eslint/no-magic-numbers -- We know what these numbers mean for this formula. */
export default function convertTemperature(celsius: number): number {
  const initialResult = celsius * 1.8;
  return initialResult + 32;
}
