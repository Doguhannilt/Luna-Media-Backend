import User from '../db/Models/userModel.js'
import bcrypt from "bcryptjs"
import generateTokenandSetcookie from '../utils/helpers/generateToken.js';


const updateUser = async (req, res) => {
    const {
        name,
        email,
        username,
        password,
        profilePic,
        bio
    } = req.body;
    const userId = req.user._id;

    try {
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (req.params.id !== userId.toString()) {
            return res.status(400).json({
                message: "You cannot update other user's profile"
            });
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedpass = await bcrypt.hash(password, salt);
            user.password = hashedpass;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {updateUser}