import mongoose from "mongoose";
const SubcommentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        required:true
    },
    createdat:{
        type:Date,
        default:Date.now
    }
});
const Subcomment = mongoose.models.Subcomment || mongoose.model("Subcomment", SubcommentSchema);
export default Subcomment;