import { NextRequest,NextResponse } from "next/server";
import { likethread,dislikethread,deletemythread } from "@/libs/actions/thread.actions";

export async function POST(request: NextRequest) {
    try{
       const {threadid,userid,action}=await request.json();
         if(!threadid || !userid || !action){
              return NextResponse.json("Invalid request")
            }
        if(action==="like"){
            const {success,message}=await likethread({threadid,userid})
            return NextResponse.json({success,message})
        }else if(action==="dislike"){
            const {success,message}=await dislikethread({threadid,userid})
            return NextResponse.json({success,message})
        }else{
            return NextResponse.json("Invalid request")
        }
    }catch(err){
        return {success:false,message:"Something went wrong"}
    }
}


export async function DELETE(request: NextRequest) {
    try{
       const {threadid,userid}=await request.json();
         if(!threadid || !userid){
              return NextResponse.json("Invalid request")
            }
        const {success,message}=await deletemythread({threadid,userid})
        return NextResponse.json({success,message})
    }catch(err){
        return {success:false,message:"Something went wrong"}
    }
}