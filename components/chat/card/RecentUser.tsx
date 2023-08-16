'use client'
import { usePathname } from 'next/navigation';
import { useOtherUser } from '@/hooks/useOtherUser'
import Link from 'next/link';
import React, { useMemo } from 'react'
import Avatar from './Avatar';
const RecentUser = ({data,currentUser}:{data:any,currentUser:any}) => {
const pathname:any=usePathname();
const activeconversationid:any=pathname.split('/').at(-1); 
   
const otheruser=data?.isgroupchat?null:useOtherUser(data.members,currentUser);

const lastmessage=useMemo(()=>{
    if(!data?.lastmessageid){
        return "Started a conversation"
    }else{
      if(data?.lastmessageid?.text){
        return data?.lastmessageid?.text.substring(0,25)
      }else{
        return "Sent a media"
      }
    }   
},[data?.lastmessageid,currentUser])


const is_seen=useMemo(()=>{
    if(!data?.lastmessageid){
        if(activeconversationid===data?._id){
            return true;
        }else{
            return false;
        }
      }else{
        if(data?.lastmessageid.seenby.includes(currentUser)){
            return true;
        }else{
            return false;
        }
    }
},[pathname,!data?.lastmessageid])

  return (
    <Link href={`/conversation/${data?._id}`}>
        <div className={`  flex gap-2 items-center p-2 rounded-md ${
            activeconversationid===data?._id && " bg-slate-800"
        }`}>
            <div className=' relative min-h-[50px] min-w-[50px] h-[50px] w-[50px]'>
            <Avatar  showactive={true} clerkid={data?.isgroupchat?"":otheruser?.clerkid} url={data?.isgroupchat?data?.groupicon:otheruser?.profilepic}/>
            </div>
            <div>
            <h1 className=' text-white'>{data?.isgroupchat?data?.groupname:otheruser?.name}</h1>
             <h1 className={` text-[13px] ${is_seen?" text-slate-400":"text-blue"}   `}>{lastmessage}</h1> 
            </div>
           
        </div>
    </Link>
  )
}

export default RecentUser