import { redirect } from "next/navigation";
import Comment from "../model/Comment";
import Thread from "../model/Thread";
import connectdb from "@/utils/database/dbconnect";
import { currentUser } from "@clerk/nextjs";
import Subcomment from "../model/Subcomment";
import User from "../model/User";

export async function createcomment({threadid,content,user:myuser}:{threadid:string,content:string,user:string}){
     try{
        if(!content || !threadid || !myuser){
            return {success:false,message:"Invalid request"}
        }
         const user=await currentUser();
         if(!user){
            return redirect("/login")
         }
         await connectdb();
        const thread=await Thread.findById(threadid);
        if(!thread){
            return {success:false,message:"Thread not found"}
        }
        const newcomment=await Comment.create({
            content:content,
            user:myuser,
            thread:threadid
        })
        const updatedcomment=await  Comment.findById(newcomment._id).populate({
            path:"user",
            model:User,
            select:"username profilepic _id"
        })
    await Thread.findByIdAndUpdate({_id:threadid},{$push:{
            comments:newcomment._id
        }})
        return {success:true,message:"Comment created succesfully",comment:updatedcomment};

     }catch(err){
        console.log("Error while creating comment",err);
        return {success:false,message:"Something went wrong"}
     }
}

export async function createsubcomment({commentid,content,user:myuser}:{commentid:string,content:string,user:string}){
    try{
        if(!content || !commentid || !myuser){
            return {success:false,message:"Invalid request"}
        }
      const user=await currentUser();
        if(!user){
              return redirect("/login")
          }
          
        await connectdb();
       const newsubcomment=await Subcomment.create({
              content:content,
                user:myuser,
                comment:commentid
         })
         
          await Comment.findByIdAndUpdate({_id:commentid},{$push:{subcomments:newsubcomment._id}})
            return {success:true,message:"Subcomment created succesfully",subcomment:newsubcomment._id};
    }catch(err){
        console.log("Error while creating subcomment",err);
        return {success:false,message:"Something went wrong"}
    }
}

export async function getallsubcomments(commentid:string){
   try{
    await connectdb();
    const subcomments=await Subcomment.find({comment:commentid}).populate({
        path:"user",
        model:User,
        select:"username profilepic _id"
    });
 
    return {success:true,message:"Subcomments fetched succesfully",subcomments:subcomments};
   }catch(err){
    console.log("Error while getting all subcomments",err);
    return {success:false,message:"Something went wrong"}
   }
}