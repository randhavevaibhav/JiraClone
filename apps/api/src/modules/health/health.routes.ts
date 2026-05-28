import { Router } from 'express';
import { checkDatabaseHealth } from './health.controller';
import { asyncHandler } from '../../middlewares/async-handler';

const router = Router();

router.get('/db', asyncHandler(checkDatabaseHealth));

export default router;
