import { NextRequest,NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { get_threadbyid } from "@/libs/actions/thread.actions";
export async function GET(req:NextRequest){
  try{
    const user=await currentUser();
    if(!user){
        return redirect("/login")
        }
    const result=await get_threadbyid(req.nextUrl.pathname.split("/")[3]);
    if(!result.success){
        return NextResponse.json({success:false,message:result.message})
    }
    return NextResponse.json({success:true,message:result.message,thread:result.thread})
    

  }catch(err){
    console.log("Error in get thread route",err);
    return NextResponse.json({success:false,message:"Something went wrong"})
  }
}