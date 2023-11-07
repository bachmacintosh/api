export default function isHourBetween(current: number, after: number, before: number): boolean {
  if (after <= before) {
    return current >= after && current < before;
  } else {
    return current >= after || current < before;
  }
}
