import { Router } from 'express';

import PokeApiController from '../controllers/poke-api';

const router = Router();

router.get('/get/:name', PokeApiController.get);

export default router;
