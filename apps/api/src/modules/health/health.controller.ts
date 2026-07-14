import { Request, Response } from 'express';
import { checkDbConnection } from './health.services';
import { Success } from '../../types/api-response';

export async function checkDatabaseHealth(_req: Request, res: Response) {
  const result = await checkDbConnection();
  const response: Success<Date> = {
    success: true,
    message: 'Database connected successfully',
    data: result[0].now,
  };
  res.status(200).send(response);
}
