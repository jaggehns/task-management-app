import express from 'express';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));

// TODO: Example route, please delete this when you implement your own routes
router.get('/hello', (_, res) => {
  res.json({ result: 'Hello there!' });
});

export default router;
