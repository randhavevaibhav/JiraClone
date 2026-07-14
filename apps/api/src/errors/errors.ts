export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(
    message = 'Bad request',
    public details?: unknown,
  ) {
    super(400, message, details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'conflict error') {
    super(409, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class UnAuthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}
