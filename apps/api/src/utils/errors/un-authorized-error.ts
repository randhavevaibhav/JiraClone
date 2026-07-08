import { AppError } from './app-error';

export class UnAuthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}
