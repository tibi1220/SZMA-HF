// @ts-ignore
import panel from '../../static/panel.json' assert { type: 'json' };
import { stringifyDate } from '../util/date';

import type { MyDate } from '../util/date';
import type { MiddleWare } from '.';
import { Panel } from '../parser/panel';

export default function getSinglePanel(): MiddleWare {
  return (_req, res, next) => {
    const date = res.locals.date as MyDate;

    res.locals.data = (panel as Panel)[stringifyDate(date)];

    return next();
  };
}
