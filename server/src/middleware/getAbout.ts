// @ts-ignore
import about from '../../static/about.json' assert { type: 'json' };

import type { MiddleWare } from '.';

export default function getAbout(): MiddleWare {
  return (_req, res, next) => {
    res.locals.data = about;

    return next();
  };
}
