import type { Request, Response } from 'express';

class PingController {
  static ping(_req: Request, res: Response): void {
    res.status(200).send({ message: 'pong' });
  }
}

export default PingController;
