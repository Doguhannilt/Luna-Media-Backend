import express from 'express'
import { createPost } from '../controllers/createPost.js';
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

router.post("/create",protectRoute ,createPost)
export default router;