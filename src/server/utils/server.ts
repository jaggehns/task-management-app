import express, { type Express } from 'express';
import ViteExpress from 'vite-express';
import 'express-async-errors';
import cors from 'cors';

import { errorMiddleware } from '../middleware/errorMiddleware.js';
import router from '../routes/index.js';

const createServer = (): Express => {
  const app = express();

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(router);

  app.use(errorMiddleware);

  ViteExpress.config({
    // Copy and paste of vite.config.ts just so vite-express does not need to import
    // vite, a devDependency, in runtime
    inlineViteConfig: {
      build: {
        outDir: './dist/client'
      }
    }
  });

  return app;
};

export default createServer;
