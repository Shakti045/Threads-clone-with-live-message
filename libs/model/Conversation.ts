import mongoose, { Mongoose } from 'mongoose';
const ConversationSchema = new mongoose.Schema({
    createdon: {
        type: Date,
        default: Date.now
    },
    lastupdatedon: {
        type: Date,
        default: Date.now,
    
    },
    lastmessageid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        }
    ],

    isgroupchat:{
        type:Boolean,
        default:false
    },
    groupname:{
        type:String,
        default:""
    },
    groupicon:{
        type:String,
        default:""
    },

})
const Conversation=mongoose.models?.Conversation || mongoose.model("Conversation",ConversationSchema);
export default Conversation;