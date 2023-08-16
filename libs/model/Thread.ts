"use server"
import mongoose from "mongoose";
const ThreadSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    likedusers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    medialinks: [
        {
            url:{
                type:String
            },
            
            resource_type:{
              type:String
            }
            
       }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdat:{
        type:Date,
        default:Date.now
    }
   
});

const Thread = mongoose.models?.Thread || mongoose.model("Thread", ThreadSchema);
export default Thread;
