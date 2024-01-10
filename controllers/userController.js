import User from '../db/Models/userModel.js'
import bcrypt from "bcryptjs"
import generateTokenandSetcookie from '../utils/helpers/generateToken.js';

const signupUser = async(req,res) => {
    try {

            // We will parse this data with the help of body-parser
        const {name, email, username, password} = req.body

            // User exists or not
        const user = await User.findOne(
            { $or: [{ email }, { username }] 
        });

        if(user) {return res.status(400)}

        const hashpass = await bcrypt.genSalt(10)
        const hashedPsw = await bcrypt.hash(password,hashpass)

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPsw
        })

        await newUser.save()
        if(newUser) {
            generateTokenandSetcookie(newUser._id,res)

            res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            username:newUser.username

        })}
        else {res.status(400)}

    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error", error.message)
    }
}


export {signupUser}