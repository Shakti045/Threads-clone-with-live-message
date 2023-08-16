'use client'
import React from 'react'
import { useAuth } from '@clerk/nextjs'
import ProfileForm from '@/components/forms/ProfileForm'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
const Editprofile = () => {
    const {userId}:{userId:any}=useAuth();
    const {profile}:any=useSelector((state:RootState)=>state.profile);
    console.log(profile)
  return (
    <main className='mx-auto flex max-w-3xl w-full flex-col justify-start px-10 '>
    <h1 className='head-text'>Edit your profile</h1>
    <p className='mt-3 text-base-regular text-light-2'>
        Edit your profile as your wish.
    </p>

    <section className='mt-9  w-[50%] sm:w-[100%] bg-dark-2 p-10'>
      <ProfileForm id={userId} editmode={true} image={profile?.profilepic} username={profile?.username} bio={profile?.bio} name={profile?.name} />
    </section>
  </main>
  )
}

export default Editprofile