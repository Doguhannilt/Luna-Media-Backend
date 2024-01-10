import  User  from "../db/Models/userModel.js"
import Post from "../db/Models/postModel.js"

const reply = async (req, res) => {
    try {
        const {text} = req.body
        const postId = req.params
        const userId = req.user._id
        const userProfilePic = req.userProfilePic
        const username = req.user.username

        if(!text) {return res.status(400).json({message: "Text field is requried"})}
        const post = await Post.findById(postId)
        if(!post) {return res.status(404)}

        const reply = {
            userId, text,userProfilePic,username
        }
        post.replies.push(reply)
        await post.save()
        res.status(200)

    } catch (error) {
        res.status(500)
    }
}

export {reply}