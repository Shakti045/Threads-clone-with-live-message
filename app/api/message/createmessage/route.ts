import { NextResponse,NextRequest } from "next/server";
import { createmessage } from "@/libs/actions/chat.actions";
interface createmessageprops{
    conversationid:string,
    text?:string,
    media?:any,
    createdby:string
  }
export async function POST(request: NextRequest){

    const {conversationid,text,media,createdby}:createmessageprops=await  request.json();
   try{
    if(!createdby || !conversationid ){
        return NextResponse.json({
            Success:false,
            Message:"Invalid request"
        },{status:404})
    }
    if(!text && !media){
        return NextResponse.json({
            Success:false,
            Message:"Please give your message"
        },{status:404})
    }

    const result=await createmessage({
        conversationid,
        text,
        media,
        createdby
    })
    if(result===null){
        return NextResponse.json({
            Success:false,
            Message:"Something went wrong"
        },{status:404})
    }
    // console.log('printing in createmessageroute',result)
    return NextResponse.json({
        Success:true,
        Message:"Message created successfully",
        newmessage:result.newmessage
    },{status:200})
  }catch(err){
      console.log(err);
      return NextResponse.json({
        Success:false,
        Message:"Something went wrong"
      },{status:404})
  }
}