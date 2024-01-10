import express from 'express'
import { createPost } from '../controllers/createPost.js';
import protectRoute from '../middlewares/protectRoute.js'
import { getPosts } from '../controllers/getPosts.js';
import { deletePost } from '../controllers/deletePost.js';

const router = express.Router()

router.get("/:id", getPosts)
router.delete("/create",protectRoute, deletePost)
router.post("/create",protectRoute ,createPost)

export default router;