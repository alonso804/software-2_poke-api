import './env';
import './redis';
import 'express-async-errors';

import express from 'express';

import { logger } from './logger';
import errorHandler from './middlewares/error-handler';
import incomeLog from './middlewares/income-log';
import pathNotFound from './middlewares/path-not-found';
import routes from './routes';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(incomeLog);

routes.forEach((route) => {
  app.use(route.path, route.router);
});

app.use(pathNotFound);
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`);
});
