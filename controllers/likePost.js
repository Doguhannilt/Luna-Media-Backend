import  User  from "../db/Models/userModel.js"
import Post from "../db/Models/postModel.js"


const likeOrnot  = async (req,res) => {
    try {
        const {id:postId} = req.params
        const userId = req.user._id

        const post = await Post.findById(postId)

        if(!post){return res.status(404)}

        const userLikedPost = post.likes.includes(userId)
        if(userLikedPost){
                // Unliking
                await Post.updateOne({_id: postId}, {$pull: {likes:userId}})
                res.status(200)}
                
        else{
                post.likes.push(userId)
                await post.save()
                res.status(200)}

    } catch (error) {
        res.status(500)
    }
}

export {likeorNot}