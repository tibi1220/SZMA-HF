import type { MiddleWare } from '.';

export default function sendDataMW(): MiddleWare {
  return (_req, res, _next) => {
    res.status(201).json(res.locals.data);
  };
}
