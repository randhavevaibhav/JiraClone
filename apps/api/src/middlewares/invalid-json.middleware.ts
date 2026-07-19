import type { ErrorRequestHandler } from 'express';

export const invalidJson: ErrorRequestHandler = (err, req, res, next) => {
  if (
    err instanceof SyntaxError &&
    'status' in err &&
    err.status === 400 &&
    'body' in err
  ) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: {
        errors: ['Malformed JSON payload syntax'],
        properties: {},
      },
    });
  }
  next(err);
};
