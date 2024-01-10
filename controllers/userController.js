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

const loginUser = async (req, res) => {
    try {
        const { 
            username, 
            password } = req.body;

        // Kullanıcıyı bul
        let user;
        try {
            user = await User.findOne({ username });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Internal" });
        }

        // Kullanıcı kontrolü
        if (!user) {
            return res.status(400).json({ message: "There is no such a user" });
        }

        // Şifre kontrolü
        const isPaswCorr = await bcrypt.compare(password, user.password);

        if (!isPaswCorr) {
            return res.status(400).json({ message: "Password is not correct" });
        }

        // Token oluştur ve çereze ekle
        generateTokenandSetcookie(user._id, res);

        // Başarılı cevap
        res.status(200).json({
            _id: user._id,
            name: user.username,
            email: user.email,
            username: user.username,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

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

const Followorunfollow = async (req, res) => {
    try {
        const { id } = req.params;
        const usertoModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        if (!usertoModify || !currentUser) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isFollowing = currentUser.following.includes(id);
        if (isFollowing) {
            // Unfollow
            // Modify current user following, modify followers of usertoModify
            await User.findByIdAndUpdate(
                req.user._id,
                { $pull: { following: id } }
            );
            await User.findByIdAndUpdate(
                id,
                { $pull: { followers: req.user._id } }
            );
        } else {
            // Follow user
            await User.findByIdAndUpdate(
                req.user._id,
                { $push: { following: id } }
            );
            await User.findByIdAndUpdate(
                id,
                { $push: { followers: req.user._id } }
            );
        }

        res.status(200).json({ message: "Operation successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser =  async (req,res) =>{
    const 
    {   name, 
        email, 
        username, 
        password, 
        profilePic, 
        bio} = req.body
    const userId = req.user._id
    try {
        let user = await User.findById(userId)
        if(!user) return res.status(400).json({message: 'User not found'})

        if(req.params.id !== userId.toString()) return res.status(400).json({
            message: "You cannot update other user's profile"
        })

        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedpass = await bcrypt.hash(password, salt)
            user.password = hashedpass
        }

        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username
        user.profilePic = profilePic || user.profilePic
        user.bio = bio || user.bio
       
        user = await user.save()
        
        res.status(200).json({message: "Profile updated sucess"})
    }  catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { 
    signupUser, 
    loginUser,
    logoutUser, 
    Followorunfollow,
    updateUser }
