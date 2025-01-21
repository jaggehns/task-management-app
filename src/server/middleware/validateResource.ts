import type { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { BadRequestError } from '../common/errors.js';

const validate =
  (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        const errorMessage = e.errors.map((err) => err.message).join(', ');
        throw new BadRequestError(errorMessage);
      }
    }
  };

export default validate;
