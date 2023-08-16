import React from 'react'
import { format } from "date-fns";
import Avatar from './Avatar';
import Image from 'next/image';
import Link from 'next/link';
import {FaDownload} from 'react-icons/fa'
interface MessageCardProps {
    ismy: boolean,
    text?: string,
    media?:any
    createdon: string,
    sendername: string,
    senderavatar: string,
}
const MessageCard = ({ismy,text,media,createdon,sendername,senderavatar}:MessageCardProps) => {
  return (
    <div className={`  w-full flex ${ismy && ' justify-end'}`}>
         <div className={`  max-w-[70%]  flex gap-3 ${ismy && " flex-row-reverse"}`}>
           <div className=' min-h-[30px] min-w-[30px] h-[30px] w-[30px] relative'>
           <Avatar url={senderavatar} />
           </div>
           <div className=' flex flex-col gap-2'>
             <div className={`flex gap-1 items-center ${ismy && " justify-end"}`}>
                <p>{sendername}</p>
                 <p className=' text-slate-400'>{format(new Date(createdon), "p")}</p>
            </div>
            <div className=''>
                {text && <p className={`    ${ismy? " bg-cyan-900": " bg-sky-900"}   p-2 rounded-3xl px-3`}>{text}</p>}
                {
                    media && (
                        <>
                          {
                            media.resource_type==='image'?(<div className='  relative h-[200px] w-[200px]'>
                            <Image alt='messagemedia' src={media.secure_url} layout='fill' objectFit='contain' />
                            </div>):(
                            <div className='  bg-blue p-3 rounded-md  flex justify-center items-center'>
                             <Link href={media.secure_url}
                             target='blank'
                                rel='noopener noreferrer'><FaDownload className=' text-xl text-white ' /></Link>
                            </div>)
                          }
                        </>
                    )
                }
            </div>
           </div>
         </div>
    </div>
  )
}

export default MessageCard