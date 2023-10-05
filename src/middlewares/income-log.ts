import type { NextFunction, Request, Response } from 'express';
import UnhaldeledHTTPMethodError from 'src/errors/unhandled-http-method';
import { logger } from 'src/logger';

type IncomeLog = {
  method: string;
  path: string;
  body?: unknown;
  query?: unknown;
};

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

const incomeLog = (req: Request, _res: Response, next: NextFunction): void => {
  const log: IncomeLog = { method: req.method, path: req.path };

  switch (req.method) {
    case HTTP_METHOD.GET:
    case HTTP_METHOD.DELETE:
      log.query = req.query;
      break;
    case HTTP_METHOD.POST:
      log.body = req.body;
      break;
    case HTTP_METHOD.PUT:
    case HTTP_METHOD.PATCH:
      log.body = req.body;
      log.query = req.query;
      break;
    default:
      // next(new UnhaldeledHTTPMethodError(req.method));
      throw new UnhaldeledHTTPMethodError(req.method);
  }

  logger.info(log);

  next();
};

export default incomeLog;
