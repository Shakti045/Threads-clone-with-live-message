import { NextRequest,NextResponse } from "next/server";
import { createsubcomment } from "@/libs/actions/comment.actions";
export async function POST(req:NextRequest){
    try{
        const {commentid,content,user}=await req.json();
        if(!commentid || !content || !user){
            return NextResponse.json({success:false,message:"Invalid request"})
        }
        const result=await createsubcomment({commentid:commentid,content:content,user:user});
        if(!result.success){
            return NextResponse.json({success:false,message:result.message})
        }
        return NextResponse.json({success:true,message:result.message,subcomment:result.subcomment})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Something went wrong"})
    }
}