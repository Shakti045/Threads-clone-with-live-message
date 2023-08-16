import { NextRequest,NextResponse } from "next/server";
import { createconversation } from "@/libs/actions/chat.actions";
export async function POST(req:NextRequest){
  try{
    const {members,groupname,groupicon} = await req.json();
    if(!members || !groupname || !groupicon){
      return NextResponse.json({
        Success:false,
        Message:"Invalid Request"
      },{status:400})
    }
    const result = await createconversation({
        members,
        groupname,
        groupicon,
        isgroupchat:true
    });
    if(!result){
      return NextResponse.json({
        Success:false,
        Message:"Something went wrong"
      },{status:500})
    }
    return NextResponse.json({
        Success:true,
        Message:"Group created successfully",
        groupid:result
    },{status:200})
  }catch(err){
    console.log("Error while creating group","=>",err);
    return NextResponse.json({
        Success:false,
        Message:"Something went wrong"
    },{status:500})
  }
}