import 'dotenv/config';

import ViteExpress from 'vite-express';
import logger from './utils/logger.js';
import createServer from './utils/server.js';

const app = createServer();

const port = parseInt(process.env.PORT || '3000', 10);

ViteExpress.listen(app, port, () =>
  logger.info(`App is started at http://localhost:${port}`)
);
