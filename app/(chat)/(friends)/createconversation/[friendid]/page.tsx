import React from 'react'
import Loader from '@/app/(root)/loading'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import { fetchuserfromclerkid } from '@/libs/actions/user.actions';
import { createconversation } from '@/libs/actions/chat.actions';
const Createconversation = async({params}:{params:{friendid:string}}) => {    
const user=await currentUser();
if(!user){
    redirect('/sign-in');
}
const userfromclerkid=await fetchuserfromclerkid(user.id);
if(!userfromclerkid){
    redirect('/sign-in');
}
const conversation=await createconversation({
    members:[userfromclerkid._id,params.friendid],
    isgroupchat:false 
})
if(!conversation){
    redirect('/error')
}
redirect(`/conversation/${conversation._id}`)
  return (
    <div className=' relative'>
          <Loader/>
    </div>
  )
}

export default Createconversation;