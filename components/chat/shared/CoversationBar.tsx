'use client'
import React, { useEffect } from 'react'
import RecentUser from '../card/RecentUser'
import { useState } from 'react'
import { pusherClient } from '@/utils/pusher/pusher'
import { find } from "lodash";
const CoversationBar = ({data,currentUser}:{data:any,currentUser:any}) => {
    const [conversations,setconversations]=useState(data?.conversations);
    // console.log(data?.conversations)
    useEffect(()=>{
       pusherClient.subscribe(currentUser.toString());
       const updatecoversation=(newmessage:any)=>{
          setconversations((conversations:any)=>{
             const conversationindex=conversations.findIndex((e:any)=>e._id===newmessage.conversation);
             const newconversation=[...conversations];
             const updatedconversation={...newconversation[conversationindex],lastmessageid:newmessage}
             newconversation.splice(conversationindex,1);
             return [updatedconversation,...newconversation];
             
         })
       }
       pusherClient.bind('conversation:update',updatecoversation)
       return ()=>{
        pusherClient.unsubscribe(currentUser);
        pusherClient.unbind('conversation:update');
       }
    },[])
  return (
    <div className='  mt-2 flex flex-col gap-3'>
    {
     conversations.map((chat:any)=>{
       return <RecentUser key={chat._id} currentUser={currentUser} data={chat}/>
     })
    }
  </div>
  )
}

export default CoversationBar



// conversations.map((conversation:any)=>{
//     if(conversation._id===newmessage.conversation){
//         return {...conversation,lastmessageid:newmessage}
//      }else{
//       return conversation;
//      }
// })
// return updatedconverastion;