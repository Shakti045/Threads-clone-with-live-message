'use client'
import React, { useState } from 'react'
import Avatar from '../card/Avatar'
import { useOtherUser } from '@/hooks/useOtherUser'
import {SlOptionsVertical} from "react-icons/sl"
import {AiTwotoneDelete} from 'react-icons/ai'
import useActiveList from '@/hooks/useActiveList'
const ChatHeader = ({members,currentuser,isgroupchat,groupdata}:{members:any[],currentuser:string,isgroupchat:boolean,groupdata?:any}) => {
    const otheruser=isgroupchat?null:useOtherUser(members,currentuser)
    const [showprofile,setshowprofile]=useState(false);
    const { members:activemembers } = useActiveList();
    const isactive=!isgroupchat?activemembers.indexOf(otheruser?.clerkid)!==-1:false
  return (
    <>
    <div className='  h-20  flex justify-between items-center p-4 border-b-[1px] border-r-slate-50'>
       <div className=' flex items-center gap-2'>
           <div className=' relative h-[50px] w-[50px]'>
            <Avatar clerkid={!isgroupchat?otheruser?.clerkid:""} showactive={true} url={isgroupchat?groupdata.groupicon:otheruser?.profilepic}/>
            </div>
         <div>
         <h1>{isgroupchat?groupdata.groupname:otheruser?.name}</h1>
         <h1 className=' text-light-3'>
          {
            isgroupchat?(<span>{members?.length} users</span>):(<>
             {
              isactive?<span>Online</span>:<span>Offline</span>
             }
            </>)
          }
         </h1>
         </div>
       </div>
       <div className=' text-[30px]'>
        <button onClick={()=>setshowprofile(!showprofile)}><SlOptionsVertical/></button>
       </div>
    </div>
     <div className={` overflow-hidden  flex flex-col  items-center gap-4 absolute z-50  duration-700  transition-all  bottom-[5rem] top-[5rem] right-0   bg-slate-900 ${showprofile?" max-sm:w-[100vw] w-[30vw] p-4 ":"w-[0px] p-0"}`}>
     <div className='  relative h-[100px] w-[100px]'>
            <Avatar clerkid={!isgroupchat?otheruser?.clerkid:""} showactive={true} url={isgroupchat?groupdata.groupicon:otheruser?.profilepic}/>
       </div>
       <h1 className='  text-[25px] font-semibold '>{isgroupchat?groupdata.groupname:otheruser?.name}</h1>
       <h1 className='  text-[25px] font-semibold '>@ {isgroupchat?groupdata.groupname:otheruser?.username}</h1>
       <button className=' p-3 rounded-full  bg-red-600 text-white'>
        <AiTwotoneDelete/>
       </button>
     </div>
    </>
  )
}

export default ChatHeader