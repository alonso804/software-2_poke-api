/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import type { Request, Response } from 'express';
import { REDIS_STORE_TIME } from 'src/helpers/constants';
import { logger } from 'src/logger';
import { client } from 'src/redis';
import { z } from 'zod';

const getSchema = z.object({
  name: z.string().nonempty(),
});

class PokeApiController {
  static async get(req: Request, res: Response): Promise<void> {
    const data = getSchema.safeParse(req.params);

    if (!data.success) {
      res.status(400).send(data.error);
      return;
    }

    const { name: pokemonName } = data.data;

    const redisRes = await client.get(`poke-api:${pokemonName}`);

    if (redisRes) {
      logger.info({ microservice: 'poke-api', message: 'Read from redis' });

      res.status(200).send(JSON.parse(redisRes));
      return;
    }

    const uri = `${process.env.POKE_API_URI}/pokemon/${pokemonName}`;

    const {
      data: { name, abilities, id },
    } = await axios.get(uri);

    await client.set(`poke-api:${pokemonName}`, JSON.stringify({ name, abilities, id }), {
      EX: REDIS_STORE_TIME,
    });

    logger.info({ microservice: 'poke-api', message: 'Read from api' });

    res.status(200).send({ name, abilities, id });
  }
}

export default PokeApiController;
