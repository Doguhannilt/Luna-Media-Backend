import  User  from "../db/Models/userModel.js"
import Post from "../db/Models/postModel.js"


const getPosts = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

            // Check post is available:
        if(!post){return res.status(400).json({message: "Post not found"})}
        res.status(200).json({post})
        
    } catch (error) {
        res.status(500)
    }
}

export {getPosts}