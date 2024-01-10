import User from '../db/Models/userModel.js'
import bcrypt from "bcryptjs"
import generateTokenandSetcookie from '../utils/helpers/generateToken.js';


const getUserProfile = async (req,res) => {
    const {username} = req.params
    const user = await User.findOne({username}).select("-password").select("-updatedAt")
    if(!user) return res.status(400)
    res.status(200)
    try {
        
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

export {getUserProfile }
