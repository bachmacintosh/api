export function isValidDate(year: number, month: number, day: number): boolean {
  const fourYears = 4;
  const oneHundredYears = 100;
  const fourHundredYears = 400;
  const isLeapYear = (year % fourYears === 0 && year % oneHundredYears !== 0) || year % fourHundredYears === 0;
  const monthsInYear = 12;
  const thirtyOneDays = 31;
  const thirtyDays = 30;
  const twentyNineDays = 29;
  const months = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };
  const monthsWithThirtyDays = [months.april, months.june, months.september, months.november];
  const monthsWithThirtyOneDays = [
    months.january,
    months.march,
    months.may,
    months.july,
    months.august,
    months.october,
    months.december,
  ];
  if (month > monthsInYear || month <= 0) {
    return false;
  }
  if (day <= 0) {
    return false;
  }
  if (monthsWithThirtyOneDays.includes(month) && day > thirtyOneDays) {
    return false;
  }
  if (monthsWithThirtyDays.includes(month) && day > thirtyDays) {
    return false;
  }
  if (month === months.february && ((isLeapYear && day >= thirtyDays) || (!isLeapYear && day >= twentyNineDays))) {
    return false;
  }
  return true;
}

export type Timestamp = string & { brand: "Timestamp" };
export function isTimeStamp(value: unknown): value is Timestamp {
  const twentyFourHours = 24;
  const datePattern =
    /(?<year>\d{4})-(?<month>[01]\d)-(?<day>[0-3]\d)T(?<hour>[0-2]\d):(?<minute>[0-5]\d):(?<second>[0-5]\d)\.(?<microsecond>\d{1,6})(?<offset>[+-][0-2]\d:[0-5]\d|Z)/u;
  if (typeof value === "string") {
    const matches = datePattern.exec(value);
    if (typeof matches?.groups === "undefined") {
      return false;
    }
    const yearNumber = parseInt(matches.groups.year, 10);
    const monthNumber = parseInt(matches.groups.month, 10);
    const dayNumber = parseInt(matches.groups.day, 10);
    const hourNumber = parseInt(matches.groups.hour, 10);
    if (!isValidDate(yearNumber, monthNumber, dayNumber)) {
      return false;
    }
    if (hourNumber >= twentyFourHours) {
      return false;
    }
    if (matches.groups.offset !== "Z") {
      const offsetPattern = /[+-](?<hour>[0-2]\d):(?<minute>[0-5]\d)/u;
      const offsetMatches = offsetPattern.exec(matches.groups.offset);
      if (typeof offsetMatches?.groups === "undefined") {
        return false;
      }
      const offsetHourNumber = parseInt(offsetMatches.groups.hour, 10);
      if (offsetHourNumber >= twentyFourHours) {
        return false;
      }
    }
    return true;
  }
  return false;
}
