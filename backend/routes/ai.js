import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { generateGroceryList, getRecommendations } from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate-list', ClerkExpressRequireAuth, generateGroceryList);
router.get('/recommendations', ClerkExpressRequireAuth, getRecommendations);

export default router;