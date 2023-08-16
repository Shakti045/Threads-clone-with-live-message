import Searchbar from '@/components/forms/Search'
import React from 'react'
import { searchuser } from '@/libs/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { fetchuserfromclerkid } from '@/libs/actions/user.actions'
import { redirect } from 'next/navigation'
import UserCard from '@/components/Cards/UserCard'
const Searchpage = async({searchParams}:{searchParams:{keyword:any}}) => {
const user=await currentUser();
if(!user){
  redirect('/sign-in')
}
const userfromclerkid:any=await fetchuserfromclerkid(user.id);
if(!userfromclerkid){
  redirect('/sign-in')
}
const data:any=await JSON.parse(JSON.stringify(await searchuser({
  keyword:searchParams.keyword?searchParams.keyword:"",
  userid:userfromclerkid._id
}))) 
  return (
    <div className=' text-light-2 w-full flex flex-col gap-4'>
     <h1 className=' text-[20px]'>Search</h1>
     <Searchbar  />
       {
        data?.length===0?(<h1 className=' text-light-2 text-[20px] text-center'>
          No users found
        </h1>):(
          <div className=' mt-5 flex flex-col gap-4'>
          {
            data?.map((user:any)=>{
              return <UserCard user={user} key={user._id} />
            })
          }
          </div>
        )
       }
    </div>
  )
}

export default Searchpage