import { NextFunction, Request, Response } from 'express';

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message || 'Internal Server Error',
  });
}