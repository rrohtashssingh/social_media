
//routes for post routes;
import express from "express";
import { createPost } from "../controllers/post.controller.js";
import { isLoggedIn } from "../utils/loggedIn.js";
import {upload} from "../middlewares/multer.middleware.js";


const router = express.Router();

//route for creating new post

    router.route("/post").post(isLoggedIn, upload.single("image"), createPost)

export default router;


