import express from 'express';
import task from './task.routes.js';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));

router.use(task);

export default router;
