import { AppError } from './app-error';

export class BadRequestError extends AppError {
  constructor(
    message = 'Bad request',
    public details?: unknown,
  ) {
    super(400, message, details);
  }
}
