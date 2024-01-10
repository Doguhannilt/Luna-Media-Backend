import express from 'express'
import  { signupUser, loginUser, logoutUser, Followorunfollow, updateUser }  from '../controllers/userController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router()


router.post("/signup",signupUser )
router.post("/login", loginUser)
router.post("/logout",logoutUser)
router.post("/follow/:id",protectRoute ,Followorunfollow)
router.post("/update/:id", protectRoute , updateUser)

export default router;