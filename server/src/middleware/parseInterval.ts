import { parseDate } from '../util/date';

import type { MiddleWare } from '.';
import type { MyDateString } from '../util/date';

export default function parseIntervalMW(): MiddleWare {
  return (req, res, next) => {
    const from = req.params.from as MyDateString;
    const to = req.params.to as MyDateString;

    res.locals.date = {
      from: parseDate(from),
      to: parseDate(to),
    };

    return next();
  };
}
