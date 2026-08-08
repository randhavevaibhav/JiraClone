import { Router } from 'express';
import { checkDatabaseHealth, checkApiHealth } from './health.controller';
import { asyncHandler } from '../../middlewares/async-handler';

const router = Router();

router.get('/db', asyncHandler(checkDatabaseHealth));
router.get('/api', asyncHandler(checkApiHealth));
export default router;
