import { Router } from 'express';
import { getUserProfile } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/profile', authenticateToken, getUserProfile);

export default router;
