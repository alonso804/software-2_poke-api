import axios, { AxiosError } from 'axios';
import type { Request, Response } from 'express';
import { performance } from 'perf_hooks';
import { REDIS_STORE_TIME } from 'src/helpers/constants';
import { logger } from 'src/logger';
import { client } from 'src/redis';
import { z } from 'zod';

const getSchema = z.object({
  name: z.string().nonempty(),
});

class PokeApiController {
  static async get(req: Request, res: Response): Promise<void> {
    const start = performance.now();

    const data = getSchema.safeParse(req.params);

    if (!data.success) {
      res.status(400).send(data.error);
      return;
    }

    const { name: pokemonName } = data.data;

    const redisRes = await client.get(`poke-api:${pokemonName}`);

    if (redisRes) {
      const end = performance.now();
      logger.info({ microservice: 'poke-api', message: 'Read from redis', time: end - start });

      res.status(200).send(JSON.parse(redisRes));
      return;
    }

    const uri = `${process.env.POKE_API_URI}/pokemon/${pokemonName}`;

    let name: string;
    let abilities: unknown[];
    let id: number;

    try {
      const response = await axios.get(uri);

      const data = response.data as { name: string; abilities: unknown[]; id: number };

      name = data.name;
      abilities = data.abilities;
      id = data.id;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          const end = performance.now();

          logger.warn({
            microservice: 'poke-api',
            message: 'Pokemon not found',
            time: end - start,
          });

          res.status(404).send({ message: 'Pokemon not found' });
          return;
        }
      }

      throw error;
    }

    await client.set(`poke-api:${pokemonName}`, JSON.stringify({ name, abilities, id }), {
      EX: REDIS_STORE_TIME,
    });

    const end = performance.now();

    logger.info({ microservice: 'poke-api', message: 'Read from api', time: end - start });

    res.status(200).send({ name, abilities, id });
  }
}

export default PokeApiController;
