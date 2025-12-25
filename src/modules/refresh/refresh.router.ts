import { Router } from 'express';
import { refreshTokenController } from './refresh.controller';

const router = Router();
router.post('/', refreshTokenController);

export default router;
