import  User  from "../db/Models/userModel.js"
import Post from "../db/Models/postModel.js"


const deletePost = async (req,res) => {
    try {
        const post = await findById(req.params.id)
        if(!post){res.status(400).json({message: "Post is not found"})}

        if(post.postedBy.toString() !== req.user._id.toString())
            {return res.status(401).json({message:"Unauthorized to delete the post"})}

        await Post.findByIdAndDelete(req.params.id)
        res.status(200)

    } catch (error) {
        res.status(500)
    }
}

export {deletePost}