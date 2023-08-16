'use client'
import {HiChat} from "react-icons/hi"
import {FaUserFriends} from "react-icons/fa"
import {BiLogOut} from "react-icons/bi"
import Link from "next/link"
import { usePathname } from "next/navigation"
const tabs=[
   {
      name:"Chat",
      icon:<HiChat size={25} />,
      path:"/conversation"
   },
    {
      name:"Friends",
      icon:<FaUserFriends size={25} />,
      path:"/friends"
    },
    {
      name:"Logout",
      icon:<BiLogOut size={25}/>,
      path:"/"
    }
]
import Avatar from "../card/Avatar"
import React from 'react'

const Menubar = ({profilepic,clerkid}:{profilepic:string,clerkid:string}) => {
    const pathname:any=usePathname();
  return (
    <section className="  flex flex-col justify-between p-2 h-full  border-r-[1px] border-dark-4 ">
      <div className=" flex flex-col gap-3 text-white">
      {
        tabs.map((tab,index)=>(
            <Link href={tab.path} key={index}>
                <div className={`flex flex-col items-center justify-center cursor-pointer p-2 rounded-md ${ tab.path!=="/"?pathname.includes(tab.path) && "bg-dark-4":""}  `}>
                {tab.icon}
                </div>
            </Link>
        ))
      }
      </div>
      <div className=' relative h-[50px] w-[50px]'>
            <Avatar showactive clerkid={clerkid} url={profilepic}/>
      </div>
    </section>
  )
}

export default Menubar