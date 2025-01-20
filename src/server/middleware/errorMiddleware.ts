import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import { CustomError } from '../common/errors.js';

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let code = 500;
  let message = 'Unexpected Error Occurred';

  if (error instanceof CustomError) {
    code = error.code;
    message = error.message;
    logger.warn({ error }, message);
  } else {
    logger.error({ error }, message);
  }

  res.status(code).json({ message });
};
