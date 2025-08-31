import express from 'express'
import authRouter from './authRoutes.js';
import expenseRouter from './expenseRoutes.js'
import protect from '../middlewares/authMiddleware.js'

const indexRoutes = express.Router()

indexRoutes.use('/auth', authRouter);
indexRoutes.use('/expenses',protect, expenseRouter);

export default indexRoutes;