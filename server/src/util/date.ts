export type MyDate = {
  year: number;
  month: number;
  day: number;
};

export type MyDateString = `${number}-${number}-${number}`;

export type ValidateDateError =
  | 'Invalid year'
  | 'Invalid month'
  | 'Invalid day'
  | 'Range error';

const dayCount: Record<number, number> = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 31,
  12: 31,
} as const;

export function addOptionalPadding(n: number) {
  return n <= 9 ? '0' + n : '' + n;
}

export function validateDate(date: MyDate): ValidateDateError | true {
  if (date.month < 1 || date.month > 12) {
    return 'Invalid month';
  }

  if (date.day < 1 || date.day > dayCount[date.month]) {
    return 'Invalid day';
  }

  return true;
}

export function parseDate(s: MyDateString) {
  const [year, month, day] = s.split('-').map(e => parseInt(e));

  return {
    year,
    month,
    day,
  };
}

export function stringifyDate(date: MyDate): MyDateString {
  return (date.year +
    '-' +
    addOptionalPadding(date.month) +
    '-' +
    addOptionalPadding(date.day)) as MyDateString;
}

export function adjustDate(date: MyDate, days: number): MyDate {
  const { year, month, day } = date;
  const currentDate = new Date(year, month - 1, day);
  currentDate.setDate(currentDate.getDate() + days);
  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  };
}
