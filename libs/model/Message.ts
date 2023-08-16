import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
    createdon: {
        type: Date,
        default: Date.now
    },
    text:{
        type:String,
    },
    media:
        {
            resource_type:{
                type:String,
                enum:["image","video","audio","document"]
            },

            secure_url:{
                type:String,
            },
        },
   
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation"
    },
    seenby:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    createdby:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
     }
 
});
const Message=mongoose.models?.Message || mongoose.model("Message",MessageSchema);
export default Message;