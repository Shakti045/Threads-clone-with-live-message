"use server";
import User from "../model/User";
import connectdb from "@/utils/database/dbconnect";
import Thread from "../model/Thread";
import  mongoose  from "mongoose";
import Comment from "../model/Comment";
import { revalidatePath } from "next/cache";
export async function createuser(
    {name,clerkid,username,bio,image}
    :{name:string,clerkid:string,username:string,bio:string,age:number,image:string}
    ){
         if(!name || !clerkid || !username || !bio || !image ) return {success:false,message:"Please fill all the fields"}
        try{
          await connectdb();
          await User.create({name,clerkid,username,bio,profilepic:image});
         return {success:true,message:"User created successfully"}
        }catch(err:any){
            return {success:false,message:err.message}
        }
}


export async function getfulluserdetails(userid:any){
    try{
      await connectdb();
      userid=new mongoose.Types.ObjectId(userid);
      const user=await User.findOne({_id:userid},{name:1,username:1,profilepic:1,bio:1}).populate({
        path:"threads",
        model:Thread,
        populate:{
            path:"user",
            model:User,
            select:"username _id profilepic "
        },
        options: { sort: {createdat: -1}}
      }).populate({
        path:'likedthreads',
        model:Thread,
        options:{$limit:10},
        populate:{
            path:"user",
            model:User,
            select:"username _id profilepic "
        },
      });
        if(!user){
            return {success:false,message:"User not found"}
        }
        return {success:true,message:"User found",user:user}
    }catch(err:any){
        console.log(err)
        return {success:false,message:"Something went wrong"};
    }
}


export async function updateuserdetails({name,clerkid,username,bio,image}:{name:string,clerkid:string,username:string,bio:string,age:number,image:string}){
  if(!clerkid){
    return {success:false,message:"Please login to continue"}
    } 
    if(!name && !username && !bio && !image){
        return {success:false,message:"Please fill atleast one field"}
    }
    let tobeupdate={};
    if(name) tobeupdate={...tobeupdate,name};
    if(username) tobeupdate={...tobeupdate,username};
    if(bio) tobeupdate={...tobeupdate,bio};
    if(image) tobeupdate={...tobeupdate,profilepic:image};
    try{
        await connectdb();
        await User.findOneAndUpdate({clerkid:clerkid},tobeupdate);
        return {success:true,message:"User updated successfully"}
    }
    catch(err:any){
        return {success:false,message:err.message}
    }
}




export const fetchuserfromclerkid=async (clerkid:string)=>{
    try{
        if(!clerkid){
            return null;
        }
        await connectdb();
        const user=await User.findOne({clerkid:clerkid});
        if(!user){
            return null;
        }
        return user;
    }catch(err:any){
        return null;
    }
}


export const searchuser=async ({keyword,userid}:{keyword?:string,userid:string})=>{
    try{
       if(!userid){
              return [];
       }
         await connectdb();
        let query={};
        if(keyword){
            query={
                $or:[
                     {name:{$regex:keyword,$options:"i"}},
                     {username:{$regex:keyword,$options:"i"}}
                ]
            }
        }
        query={...query,_id:{$ne:userid}}
        const users=await User.find(query,{name:1,username:1,profilepic:1,_id:1});
        return users;
    }catch(err:any){
        return [];
    }
}


export const getuseractivity=async (userid:any)=>{
    try{
        if(!userid){
            return {success:false,message:"Please login to continue"}
        }
        await connectdb();
        userid=new mongoose.Types.ObjectId(userid);
        let threads=await Thread.find({user:userid},{_id:1})
        const mythreadids=threads.map((thread:any)=>thread._id);
        let comments=await Comment.find({thread:{$in:mythreadids}},{_id:1,content:1,createdat:1,thread:1}).populate({
            path:"user",
            model:User,
            select:"username _id profilepic name "
        })
        // threads=threads.map((thread:any)=>{return {...thread._doc,type:"thread"}});
        // comments=comments.map((comment:any)=>{return {...comment._doc,type:"comment"}});
        // console.log(threads,comments)

        // let comments=await Comment.find({user:userid},{_id:1,content:1,createdat:1}).limit(10);
        // // const likes=await User.findOne({_id:userid},{likedthreads:1});
        
        // threads=threads.map((thread:any)=>{
        //     return {...thread._doc,activity:"thread"}
        // })
        // comments=comments.map((comment:any)=>{
        //     return {...comment._doc,activity:"comment"}
        // })
       
        // let activity=comments.concat(threads);
        // activity=activity.sort((a:any,b:any)=>{
        //     return b.createdat-a.createdat;
        // })

        revalidatePath('/activity');
        return {success:true,message:"User activity found",activity:comments}
    }catch(err:any){
        return {success:false,message:err.message}
    }
}


