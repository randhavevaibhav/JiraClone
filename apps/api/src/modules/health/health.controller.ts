import { Request, Response } from 'express';

import { checkDbConnection } from './health.services';

export async function checkDatabaseHealth(_req: Request, res: Response) {
  await checkDbConnection();

  res.json({
    success: true,
    message: 'Database connected successfully',
  });
}
