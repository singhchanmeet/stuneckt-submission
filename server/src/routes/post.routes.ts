import { Router } from 'express';
import { createPost, getAllPosts, getPostsByUser } from '../controllers/post.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/create', authenticateToken, createPost);
router.get('/all', getAllPosts);
router.get('/user/:username', getPostsByUser);

export default router;
