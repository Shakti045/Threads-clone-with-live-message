import { getallconversation } from '@/libs/actions/chat.actions'
import React from 'react'
import {MdGroupAdd} from "react-icons/md"
import CoversationBar from './CoversationBar'
import Link from 'next/link'
const ChatBar = async() => {
  const data=await JSON.parse(JSON.stringify(await getallconversation()));
  if(data===null){
    return ;
  }
 
  const currentUser=data?.currentuser;
  return (
    <div className='  text-white p-2'>
        <div className=' flex justify-between items-center'>
             <h1 className=" font-bold text-[20px]">
                Messages
              </h1>
             <Link href={'/creategroup'}><MdGroupAdd size={25} /></Link>
        </div>
      <CoversationBar data={data} currentUser={currentUser} />
    </div>
  )
}

export default ChatBar;