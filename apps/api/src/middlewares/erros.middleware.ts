import { POSTGRES_ERROR_MAP } from '../utils/db-errors';
import { AppError } from '../errors/errors';
import type { NextFunction, Request, Response } from 'express';

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.details,
    });
  }

  if (error.cause) {
    if (typeof error.cause === 'object' && 'code' in error.cause) {
      const code = error.cause.code as string;
      if (POSTGRES_ERROR_MAP[code]) {
        const mappedError = POSTGRES_ERROR_MAP[code];
        return res.status(mappedError.status).json({
          success: false,
          message: mappedError.message,
        });
      }
    }
  }
  console.log('Internal Server Error ==> ', error);
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
}
