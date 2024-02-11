import express from 'express';
import { loginUser, signupUser } from '../controllers/auth.js';
import { ProfileUpdateController } from '../controllers/profile.controller.js';
import { profileMiddleware } from '../middlewares/profile.middleware.js';

const router = express.Router();

// to register a user
router.route('/signup').post(signupUser);

// to login a user
router.route('/login').post(loginUser);

// to lcheck or update user profile
router.route('/profile').post(profileMiddleware,ProfileUpdateController);

export default router;