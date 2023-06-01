import { addOptionalPadding } from '../util/date';

export default function getTimeStamps(): [string[], number] {
  const hourDigits = [];
  const minuteDigits = ['00', '15', '30', '45'];
  for (let i = 0; i < 24; i++) {
    hourDigits.push(addOptionalPadding(i));
  }

  const timeStamps = [];

  for (let i = 0; i < hourDigits.length; i++) {
    for (let j = 0; j < minuteDigits.length; j++) {
      timeStamps.push(hourDigits[i] + ':' + minuteDigits[j]);
    }
  }

  return [timeStamps, timeStamps.length];
}
