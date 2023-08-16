import { NextRequest,NextResponse } from "next/server";
import { getallsubcomments } from "@/libs/actions/comment.actions";

export async function POST(req:NextRequest){
    try{
        const {commentid}=await req.json();
        if(!commentid){
            return NextResponse.json({success:false,message:"Invalid request"})
        }
        const result=await getallsubcomments(commentid);
        if(!result.success){
            return NextResponse.json({success:false,message:result.message})
        }
        return NextResponse.json({success:true,message:result.message,subcomments:result.subcomments})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Something went wrong"})
    }
}