import { Request, Response } from 'express';

import { checkDbConnection } from '../db/index';

export async function checkDatabaseHealth(
  _req: Request,
  res: Response,
) {
  await checkDbConnection();

  res.json({
    success: true,
    message: 'Database connected successfully',
  });
}