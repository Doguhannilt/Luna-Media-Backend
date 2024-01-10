import mongoose from "mongoose";

const postSchema = mongoose.Scheman({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        maxLength: 500
    },
    img:{
        type:String,
    },
    likes: {
        type:Number,
        default:0
    },
    replies:[
        {
            userid:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type:String,
                required: true,
            },
            userProfilePic:{
                type:String,
            },
            username: {
                type:String
            }
        }
    ]
},{
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)
export default Post;