import { parseDate } from '../util/date';

import type { MiddleWare } from '.';
import type { MyDateString } from '../util/date';

export default function parseDateMW(): MiddleWare {
  return (req, res, next) => {
    const date = req.params.date as MyDateString;

    res.locals.date = parseDate(date);

    return next();
  };
}
