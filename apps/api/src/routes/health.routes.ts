import { Router } from 'express';
import { checkDatabaseHealth } from '../controllers/db.health.controller';
import { asyncHandler } from '../middlewares/async-handler';

const router = Router();
/**
 * @swagger
 * /health/db:
 *   get:
 *     summary: Check database connection
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Database connected successfully
 */
router.get(
  '/db',
  asyncHandler(checkDatabaseHealth),
);

export default router;