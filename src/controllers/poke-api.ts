/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import type { Request, Response } from 'express';
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

    const redisRes = await client.get(pokemonName);

    if (redisRes) {
      res.status(200).send(JSON.parse(redisRes));
      return;
    }

    const uri = `${process.env.POKE_API_URI}/pokemon/${pokemonName}`;

    const {
      data: { name, abilities },
    } = await axios.get(uri);

    client.set(pokemonName, JSON.stringify({ name, abilities }));

    res.status(200).send({ name, abilities });
  }
}

export default PokeApiController;
