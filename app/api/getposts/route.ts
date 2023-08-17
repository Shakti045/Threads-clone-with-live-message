import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { get_threads } from "@/libs/actions/thread.actions";

export async function GET(req:NextRequest){
  try{
    const user:any=await currentUser();
    console.log("Printing user in getthreads api",user)
    if(!user){
      return redirect("/sign-in")
    }
    const skip:any=req.nextUrl.searchParams.get("skip")
    // console.log("Printing skip amount",skip)
    // const {skip}=await req.json();
    const {success,message,threads,myuser,hasmorethread,skipamount}=await get_threads(user.id,skip);
    if(!success){
        return NextResponse.json({success:false,message:message},{status:400})
        }
    return NextResponse.json({success:true,message:message,threads:threads,myuser:myuser,hasmorethread,skipamount},{status:200})
  }catch(err:any){
    console.log(err)
    return NextResponse.json({success:false,message:"Something went wrong"},{status:500})
  }
}