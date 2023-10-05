import { Router } from 'express';

import PingController from '../controllers/ping';

const router = Router();

router.get('/ping', PingController.ping);

export default router;
