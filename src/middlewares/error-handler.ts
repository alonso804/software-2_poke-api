import type { NextFunction, Request, Response } from 'express';
import BaseError from 'src/errors/base-error';
import { logger } from 'src/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  const response = {
    status: 500,
    message: 'Internal Server Error',
  };

  if (error instanceof BaseError) {
    response.status = error.status;
    response.message = error.message;
  }

  logger.error({ microservice: 'search-api', message: error.message });

  res
    .set({
      'x-status-code': response.status,
    })
    .status(response.status)
    .send({ message: response.message });
};

export default errorHandler;
