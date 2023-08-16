import { NextRequest,NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { getfulluserdetails } from "@/libs/actions/user.actions";
import { redirect } from "next/navigation";
export async function GET(req:NextRequest){
    try{
        const user=await currentUser();
        if(!user){
            return redirect("/sign-in")
        }
        const userid=req.nextUrl.pathname.split("/")[4];
        if(!userid){
            return NextResponse.json({success:false,message:"Invalid request"})
        }
        const result=await getfulluserdetails(userid);
        if(!result.success){
            return NextResponse.json({success:false,message:result.message})
        }
        return NextResponse.json({success:true,message:result.message,user:result.user})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Something went wrong"})
    }
}