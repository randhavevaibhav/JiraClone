import { BadRequestError } from '../errors/errors';
import { Request, Response, NextFunction } from 'express';
import { z, ZodType } from 'zod';

export const zodValidate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new BadRequestError(
        'Validation failed',
        z.treeifyError(result.error),
      );
    }

    req.body = result.data;

    next();
  };
