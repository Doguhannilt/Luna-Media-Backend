import express from 'express'
import { createPost } from '../controllers/createPost.js';
import protectRoute from '../middlewares/protectRoute.js'
import { getPosts } from '../controllers/getPosts.js';
import { deletePost } from '../controllers/deletePost.js';
import { likeorNot } from '../controllers/likeOrnot.js';
import { reply } from '../controllers/reply.js';
import { feed } from '../controllers/feed.js';

const router = express.Router()

router.get("/:id", getPosts)
router.delete("/create",protectRoute, deletePost)
router.post("/create",protectRoute ,createPost)
router.post("/like/:id",protectRoute ,likeorNot)
router.post("/reply/:id",protectRoute ,reply)
router.post("/feed",protectRoute ,feed)

export default router;