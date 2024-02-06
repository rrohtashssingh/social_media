import express from 'express';
import { loginUser, signupUser } from '../controllers/auth.js';

const router = express.Router();

// to register a user
router.post('/signup', signupUser);

// to login a user
router.post('/login', loginUser);

export default router;