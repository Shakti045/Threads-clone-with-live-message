"use server"
import { revalidatePath } from "next/cache";
import Thread from "../model/Thread";
import User from "../model/User";
import connectdb from "@/utils/database/dbconnect";
import Comment from "../model/Comment";
import Subcomment from "../model/Subcomment";
import { redirect } from "next/navigation";
export  async function createthread({
    clerkid,
    content,
    medialinks
   }:{clerkid:string,content:string,medialinks:any})
  
 {
    if(!clerkid){
        return {success:false,message:"Unauthorised request"}
    }
    if(!content &&  medialinks.length==0 ){
        return {success:false,message:"Please provide something to create post"}
    }

    try{
        await connectdb();
        const user=await User.findOne({
            clerkid:clerkid
        })
        if(!user){
            return {success:false,message:"User noty found"}
        }
        const newthread=await Thread.create({
            content:content?content:"",
            medialinks:medialinks?Array.from(medialinks):[],
            user:user._id
        })

        await User.findByIdAndUpdate({_id:user._id},{$push:{
            threads:newthread._id
        }})

         revalidatePath("/")

        return {success:true,message:"Thread created succesfully"}
    }catch(err:any){
        console.log(err)
        return {success:false,message:err.message}
    }
}


export async function get_threads(clerkid:string,skip?:any){
     try{
        const skipamount=parseInt(skip?skip:0);
        await connectdb();
        const myuser= await User.findOne({clerkid:clerkid},{name:1,profilepic:1,username:1,_id:1});
        if(!myuser){
           return redirect('/onboarding')
        }
        await connectdb();
        const threads=await Thread.find({}).populate({
            path:"user",
            model:User,
            select:"username _id profilepic "
        }).skip(skipamount).limit(5).sort({createdat:-1})

        if(!threads){
            return {success:false,message:"No threads found"}
        }
        const totalthreads=await Thread.countDocuments();
        const hasmorethread=(totalthreads-skipamount-5)>0
        // console.log(hasmorethread);
        // console.log(totalthreads-skipamount)
        // console.log(totalthreads)
        return {success:true,message:"Threads found",threads:threads,myuser:myuser,hasmorethread,skipamount:5+skipamount}
     }catch(err:any){
        console.log("Error while fetching posts",err.message)
        return {success:false,message:"Something went wrong"}
     }
}



export async function get_threadbyid(threadid:string){
    try{
        await connectdb();
        const thread=await Thread.findById(threadid).populate({
            path:"user",
            model:User,
            select:"_id username profilepic"
        }).populate({
            path:"comments",            
            model:Comment,
            populate:{
                path:"user",
                model:User,
                select:"_id username profilepic"
             }
        })
        if(!thread){
            return {success:false,message:"No thread found"}
        }
        return {success:true,message:"Thread found",thread:thread}
    }catch(err){
        console.log("Error while fetching thread","=>",err)
        return {success:false,message:"Something went wrong"}
    }
}     


export const likethread=async ({threadid,userid}:{threadid:any,userid:any})=>{
      try{
          if(!threadid || !userid){
            return {success:false,message:"Invalid request"}
          } 
            await connectdb();
            await Thread.findByIdAndUpdate({_id:threadid},{$push:{
                likedusers:userid
            }})
            await User.findByIdAndUpdate({_id:userid},{$push:{
                likedthreads:threadid
            }})
            return {success:true,message:"Thread liked succesfully"}
      }catch(err){
        console.log("Error while liking the thread")
        return {success:false,message:"Something went wrong"}
      }
}


export const dislikethread=async ({threadid,userid}:{threadid:any,userid:any})=>{
    try{
        if(!threadid || !userid){
          return {success:false,message:"Invalid request"}
        } 
          await connectdb();
          await Thread.findByIdAndUpdate({_id:threadid},{$pull:{
            likedusers:userid
          }})
          await User.findByIdAndUpdate({_id:userid},{$pull:{
              likedthreads:threadid
          }})
          return {success:true,message:"Thread disliked succesfully"}
    }catch(err){
      console.log("Error while liking the thread")
      return {success:false,message:"Something went wrong"}
    }
}

export  const deletemythread=async ({threadid,userid}:{threadid:any,userid:any})=>{
  try{
       await connectdb();
       const thread=await Thread.findByIdAndDelete({_id:threadid})
         if(!thread){
              return {success:false,message:"Thread not found"}
            }
            await User.findByIdAndUpdate({_id:userid},{$pull:{
                threads:threadid
            }})
            return {success:true,message:"Thread deleted succesfully"}
  }catch(err:any){
    console.log("Error while deleting the thread",err.message);
     return {success:false,message:"Something went wrong"}
  }
}
