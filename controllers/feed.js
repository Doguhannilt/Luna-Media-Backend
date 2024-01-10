import  User  from "../db/Models/userModel.js"
import Post from "../db/Models/postModel.js"

const feed = async (req,res) => {
    try {
        
        const userId = req.user._id
        const user = await User.findById(userId)
        if(!User){res.status(404).json({message: "User not found"})}

        const following = user.following

        const feedPosts = await Post.find({postedBy: {$in: following}}).sort({createdAt: -1})
        res.status(200)

    } catch (error) {
        res.status(500)
    }
}

export {feed}