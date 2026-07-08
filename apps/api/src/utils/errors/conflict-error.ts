import { AppError } from './app-error';

export class ConflictError extends AppError {
  constructor(message = 'conflict error') {
    super(409, message);
  }
}
