import { connect, connection } from 'mongoose';

import { logger } from './logger';

async function initMongo(): Promise<void> {
  let success = false;

  while (!success) {
    try {
      await connect(process.env.MONGO_URI);
      logger.info(`Connected to '${connection.name}' database`);
      success = true;
    } catch (error) {
      logger.error(`Error connecting to database: ${error}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

initMongo();
