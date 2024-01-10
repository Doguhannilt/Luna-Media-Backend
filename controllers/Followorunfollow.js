import User from '../db/Models/userModel.js'
import bcrypt from "bcryptjs"
import generateTokenandSetcookie from '../utils/helpers/generateToken.js';



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

export { Followorunfollow }