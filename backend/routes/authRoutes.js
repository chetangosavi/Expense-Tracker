import express from 'express'
import {registerUser,loginUser,logoutUser,me} from '../controllers/authController.js'
import protect from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get("/me", protect, me);

export default router;