import MessageBody from '@/components/chat/message/MessageBody';
import MessageInput from '@/components/chat/message/MessageInput';
import ChatHeader from '@/components/chat/shared/ChatHeader';
import { getallmessageofaconversation } from '@/libs/actions/chat.actions'
import React from 'react'

const Conversation = async ({params}:{params:{conversationid:string}}) => {
  const data=JSON.parse(JSON.stringify(await getallmessageofaconversation(params.conversationid)));
  if(data===null){
    return ;
  }
  const {members,currentuser,messages,isgroupchat}=data;
  let groupdata={};
  if(isgroupchat){
    groupdata={
      groupname:data.groupname,
      groupicon:data.groupicon
    }
  }
  // console.log("Members",members);
  // console.log("currentuser",currentuser);
  // console.log("messages",messages);
  // console.log("isgroupchat",isgroupchat);
  return (
    <div className=' flex flex-col justify-between w-full h-full  text-white'>
      <ChatHeader isgroupchat={isgroupchat} groupdata={groupdata}   members={members} currentuser={currentuser}/>
      <MessageBody conversationid={params.conversationid} members={members} currentuser={currentuser} messages={messages}/>
      <MessageInput conversationid={params.conversationid} currentuser={currentuser}/>
    </div>
  )
}

export default Conversation