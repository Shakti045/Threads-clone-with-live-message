'use client'
import { useRef, useState,useEffect } from "react"
import MessageCard from "../card/MessageCard"
import { useOtherUser } from "@/hooks/useOtherUser"
import { pusherClient } from "@/utils/pusher/pusher"
import { find } from "lodash";
import { useGroupUsers } from "@/hooks/useGroupUsers"
import Typing from "../shared/Typing"
import Avatar from "../card/Avatar"
const MessageBody = (
    {messages:initialmessages,currentuser,members,conversationid}:{messages: any[],currentuser: string,members: any[],conversationid:string}
) => {
  const [messages, setMessages] = useState(initialmessages)
  const otheruser=members.length===2?useOtherUser(members,currentuser):"";
  const othergroupusers:any=members.length>=3?useGroupUsers(members,currentuser):"";
  const [typing,settyping]=useState(false);
  const user=members.find((member)=>member._id===currentuser);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    bottomRef?.current?.scrollIntoView();
  },[messages])

  useEffect(()=>{
   pusherClient.subscribe(conversationid);
   const messagehandler=(message:any)=>{
      setMessages((current) => {
        if (find(current, { _id: message._id })) {
          return current;
        }

        return [...current, message]
      });
   }
   pusherClient.bind('messages:new',messagehandler)
   return ()=>{
    pusherClient.unsubscribe(conversationid);
    pusherClient.unbind('messages:new')
   }
  },[conversationid])
  return (
    <div className=' messagebody flex flex-col p-5  gap-5 custom-scrollbar overflow-y-scroll h-[calc(100%-10rem)] w-full'>
      {
        messages.map((message)=>{
          const groupuser=members.length>2?othergroupusers.find((user:any)=>user._id===message.createdby):""
          return (
            <MessageCard key={message._id} 
             ismy={message.createdby===currentuser}
             text={message?.text}
             media={message?.media}
             sendername={
              message.createdby===currentuser?user?.name:(
                members.length===2?otheruser?.name:
                  groupuser?.name
              )
             }
             senderavatar={
              message.createdby===currentuser?user?.profilepic:(
                members.length===2?otheruser?.profilepic:
                groupuser?.profilepic
                
              )
             }
              createdon={message.createdon}
            />
          )
        })
      }
      {
        typing && (
          <div className=" flex gap-2">
          <div className=' min-h-[30px] min-w-[30px] h-[30px] w-[30px] relative'>
                <Avatar  showactive={false} url={otheruser?.profilepic} />
           </div>
            <div className=" flex flex-col ">
             <h1>{otheruser?.name}</h1>
             <Typing/>
            </div>
          </div>
        )
      }
     <div  ref={bottomRef} />
    </div>
  )
}

export default MessageBody


// members.length===2?(message.createdby===currentuser?user?.name:otheruser?.name):(
                
//   )