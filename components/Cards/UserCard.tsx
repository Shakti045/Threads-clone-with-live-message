'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const UserCard = ({user,fromrightsidebar}:{user:any,fromrightsidebar?:boolean}) => {
  return (
    <div className=' w-full flex justify-between'>
       <div className=' flex gap-2 '>
         <Link href={`/profile/${user._id}`} className='  relative h-11 w-11'>
             <Image
                  src={user.profilepic}
                  alt='user_image'
                  fill
                  className='cursor-pointer rounded-full'
                />  
           </Link>
           <div className=' flex flex-col'>
            <h1>@{user.username}</h1>
            <h1 className=' truncate'>{user.name}</h1>
           </div>
        </div>

       {
        !fromrightsidebar && (
          <Link href={`/profile/${user._id}`}><button className=' bg-purple-600 text-white rounded-md p-2  py-1'>View Profile</button></Link>
        )
       }
    </div>
  )
}

export default UserCard