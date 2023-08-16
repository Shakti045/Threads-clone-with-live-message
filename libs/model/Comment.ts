import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    thread:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Thread",
        required:true
    },
    subcomments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    likedusers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    createdat:{
        type:Date,
        default:Date.now
    }
});
const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;