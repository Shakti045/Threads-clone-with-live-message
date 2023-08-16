import { NextRequest,NextResponse } from "next/server";
import { createcomment } from "@/libs/actions/comment.actions";

export async function POST(req:NextRequest){
    try{
        const {threadid,content,user}=await req.json();
        if(!threadid || !content || !user){
            return NextResponse.json({success:false,message:"Invalid request"})
        }
        const result=await createcomment({threadid:threadid,content:content,user:user});
        if(!result.success){
            return NextResponse.json({success:false,message:result.message})
        }
        return NextResponse.json({success:true,message:result.message,comment:result.comment})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Something went wrong"})
    }
}