import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { fetchuserfromclerkid } from '@/libs/actions/user.actions'
import { searchuser } from '@/libs/actions/user.actions'
import { redirect } from 'next/navigation'
import UserCard from '@/components/Cards/UserCard'
const RightBar = async () => {
  const user=await currentUser();
  // console.log("Printing user from right sidebar",user);
if(!user){
  redirect('/sign-in')
}

const userfromclerkid:any=await fetchuserfromclerkid(user.id);
// console.log("Printing clerkiduser from right sidebar ",userfromclerkid);
if(!userfromclerkid){
  redirect('/onboarding')
}
const data:any=JSON.parse(JSON.stringify(await searchuser({
  keyword:"",
  userid:userfromclerkid._id
})))
  return (
    <section className='custom-scrollbar rightsidebar'>
    <div className='flex flex-1 flex-col justify-start'>
      <h3 className='text-heading4-medium text-light-1'>
        SIMILAR MINDS
      </h3>

      <div className='mt-7 flex w-[200px] text-white flex-col gap-9'>
      {
            data?.map((user:any)=>{
              return <UserCard fromrightsidebar={true} user={user} key={user._id} />
            }
            )
         }
      </div>
    </div>
  </section>
  )
}

export default RightBar
