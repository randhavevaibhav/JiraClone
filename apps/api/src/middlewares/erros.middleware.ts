import { AppError } from '../utils/errors/app-error';
import type { NextFunction, Request, Response } from 'express';

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.details,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
}
