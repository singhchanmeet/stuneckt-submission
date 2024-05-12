import { Router } from 'express';
import { getUserProfile, followUser, updateUserDetails } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/profile', authenticateToken, getUserProfile);
router.post('/follow/:usernameToFollow', authenticateToken, followUser);
router.put('/update', authenticateToken, updateUserDetails);

export default router;
