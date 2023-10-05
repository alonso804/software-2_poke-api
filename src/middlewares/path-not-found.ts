import type { NextFunction, Request, Response } from 'express';
import PathNotFound from 'src/errors/path-not-found';

const pathNotFound = (req: Request, _res: Response, next: NextFunction): void => {
  if (!req.route) {
    throw new PathNotFound({ path: req.path, method: req.method });
  }

  next();
};

export default pathNotFound;
