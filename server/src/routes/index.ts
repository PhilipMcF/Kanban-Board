import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
// import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
// Removed authentication to all API routes
// only for ticket routes so we can add users for testing api and actually login without seeding DB with preset users
router.use('/api', apiRoutes);

export default router;
