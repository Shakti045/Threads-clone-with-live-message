'use client'
import React from 'react'
import Image from "next/image"
import useActiveList from '@/hooks/useActiveList'
const Avatar = ({url,showactive,clerkid}:{url:string,showactive?:boolean,clerkid?:string}) => {
  const { members } = useActiveList();
  const isactive=clerkid?members.indexOf(clerkid)!==-1:false;
  return (
     <>
     <Image    fill className=' rounded-full ' src={url} alt='avatarimage'/>
      {
         showactive?(<>
          {
            isactive && (
              <span 
              className="
                absolute 
                block 
                rounded-full 
                bg-green-800 
                ring-2 
                ring-white 
                top-0 
                right-0
                // h-2 
                // w-2 
                // md:h-3 
                // md:w-3
              " 
            />
            )
          }
         </>):(<></>) 
      }
     </>
  )
}

export default Avatar