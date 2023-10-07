import { createClient } from 'redis';

import { logger } from './logger';

export const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

async function initRedis(): Promise<void> {
  let success = false;

  while (!success) {
    try {
      await client.connect();
      logger.debug('Connected to redis');
      success = true;
    } catch (error) {
      logger.error(`Error connecting to redis: ${error}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

initRedis();
