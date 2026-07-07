import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

type ValidationError = {
  errors: string[];
};

export const zodValidate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const reducedError = result.error.issues.reduce<
        Record<string, ValidationError>
      >((acc, issue) => {
        const fieldName = issue.path[0] as string;
        if (acc[fieldName]) {
          acc[fieldName].errors.push(issue.message);
        } else {
          acc[fieldName] = {
            errors: [issue.message],
          };
        }

        return acc;
      }, {});
      return res.status(400).json({
        message: 'Validation failed',
        error: reducedError,
      });
    }

    req.body = result.data;

    next();
  };
