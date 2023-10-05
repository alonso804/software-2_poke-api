/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Router } from 'express';
import { glob } from 'glob';
import { logger } from 'src/logger';

const routeFiles = glob.sync('**/*.{ts,js}', { cwd: __dirname, ignore: '**/index.{ts,js}' });

const routes: { path: string; router: Router }[] = routeFiles.map((routeFile) => {
  return {
    path: `/${routeFile.split('.')[0]}`,
    router: require(`./${routeFile}`).default,
  };
});

logger.info({ paths: routes.map((route) => route.path) });

export default routes;
