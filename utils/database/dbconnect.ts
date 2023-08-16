"use server"
import mongoose from "mongoose";
let isconnected=false;
const connectdb=async ()=>{

    if(isconnected){ return }
    try{
        await mongoose.connect(process.env.MONGODB_URL!)
        isconnected=true;
        console.log("dB connected")
     }catch(err){
        console.log("Error while connecting database","=>",err)
     }
}

export default connectdb;