import express from 'express'

import protectRoute from '../middlewares/protectRoute.js';
import { signupUser } from '../controllers/signupUser.js';
import { loginUser } from '../controllers/loginUser.js';
import { logoutUser} from '../controllers/logoutUser.js';
import { Followorunfollow} from '../controllers/Followorunfollow.js';
import {updateUser} from '../controllers/updateUser.js';
import  { getUserProfile }  from '../controllers/getUserProfile.js';


const router = express.Router()

router.post("/profile/:username", getUserProfile)
router.post("/signup",signupUser )
router.post("/login", loginUser)
router.post("/logout",logoutUser)
router.post("/follow/:id",protectRoute ,Followorunfollow)
router.post("/update/:id", protectRoute , updateUser)

export default router;