import mongoose from "mongoose";
const Userscheema=new mongoose.Schema({
    clerkid:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    bio:{
        type:String,
        required:true  
    },
    profilepic:{
        type:String,
        required:true,
    },
    threads:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Thread"
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    likedthreads:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Thread"
        }
    ],
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
})

const User=mongoose.models?.User || mongoose.model("User",Userscheema);
export default User;