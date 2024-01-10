import  User  from "../db/Models/userModel.js"
import Post from "../db/Models/postModel.js"

const createPost = async (req, res) => {

    try {
        
        const {
            postedBy, 
            text,
            img
        } = req.body;

        if (!postedBy || !text) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const user = await User.findById(postedBy);
        const maxLength = 500;

            // If there is no such a user:
        if (!user) {return res.status(404).json({ message: "User not found" });}

            // If user wants to create post for the other user
        if (user._id.toString() !== req.user._id.toString()) {return res.status(401).json({ message: "Unauthorized to create a post" });}

            // If text length over than maxLength
        if (text.length > maxLength) {return res.status(400).json({ message: `Text must be less than ${maxLength} characters` });}

        const newPost = new Post({ postedBy, text, img });
        await newPost.save();

        return res.status(201).json({ message: "Post created successfully", post: newPost });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



export {createPost}