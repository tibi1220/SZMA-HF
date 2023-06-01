import type { Request, Response, NextFunction } from 'express';

export type MiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
