import { Router } from 'express';
import { getAIInsights } from '../controllers/ai.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Get AI Insights (Protected)
router.get('/insights', authenticate, getAIInsights);

export default router;
