import express from 'express';
import { loginUser, signupUser } from '../controllers/auth.js';
import { ProfileUpdateController } from '../controllers/profile.controller.js';
import { profileMiddleware } from '../middlewares/profile.middleware.js';

const router = express.Router();

// to register a user
router.post('/signup', signupUser);

// to login a user
router.post('/login', loginUser);

// to lcheck or update user profile
router.post('/profile',profileMiddleware, ProfileUpdateController);

export default router;