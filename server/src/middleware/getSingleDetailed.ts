// @ts-ignore
import detailed from '../../static/detailed.json' assert { type: 'json' };
import { stringifyDate } from '../util/date';

import type { MyDate } from '../util/date';
import type { MiddleWare } from '.';
import { Detailed } from '../parser/detailed';

export default function getSingleDetailed(): MiddleWare {
  return (_req, res, next) => {
    const date = res.locals.date as MyDate;

    res.locals.data = (detailed as unknown as Detailed)[stringifyDate(date)];

    return next();
  };
}
