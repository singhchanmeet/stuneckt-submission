import { Router } from 'express';
import { getUserProfile, followUser } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/profile', authenticateToken, getUserProfile);
router.post('/follow/:usernameToFollow', authenticateToken, followUser);

export default router;
