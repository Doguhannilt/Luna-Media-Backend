import User from '../db/Models/userModel.js'
import bcrypt from "bcryptjs"
import generateTokenandSetcookie from '../utils/helpers/generateToken.js';


const logoutUser = (req,res) => {
    try {
       res.cookie("jwt", "", {maxAge:1}) 
       res.status(200).json({
        message: "User logged out sucessfully"
       })
    } catch (error) {
        res.status(500).json(
            {message: error.message})
    }
}

export {logoutUser}