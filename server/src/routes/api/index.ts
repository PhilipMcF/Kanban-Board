import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

// authenticate token only for ticket routes; so we can test api and add users
router.use('/tickets', authenticateToken, ticketRouter);
router.use('/users', userRouter);

export default router;
