
import express from "express";
import { createPost } from "../controllers/post.controller.js";
import { isLoggedIn } from "../utils/loggedIn.js";


const router = express.Router();

router.post('/post',isLoggedIn,createPost);

export default router;