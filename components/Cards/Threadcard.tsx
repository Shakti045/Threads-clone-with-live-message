'use client'
import React, { useState } from 'react'
import Image from 'next/image'
// import ReactPlayer from 'react-player'
// import MediaCard from './MediaCard'
import date from "date-and-time"
import CommentForm from '../forms/CommentForm'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'
import { setThreads } from '@/redux/slices/threadslice'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { setrepostThread } from '@/redux/slices/repostslice'
interface props{
    content:string,
    medialinks:any,
    user:any,
    comments:string [],
    likedusers:string [],
    createdat:string,
    _id:string,
    fromthreadpage?:boolean,
    setThread?:any
    thread?:any
}
const Threadcard = ({_id,content,medialinks,user,comments,likedusers,
    createdat,thread,fromthreadpage,setThread}:props) => {
      const dispatch:AppDispatch = useDispatch();
      const router = useRouter();
      const [show,setShow] = useState<boolean>(false);
      const {user:myuser}:{user:any}=useSelector((state:RootState)=>state.user);
      const {threads}:{threads:any}=useSelector((state:RootState)=>state.thread);
      async function likeThread(){
         if(fromthreadpage){
            setThread({...thread,likedusers:[...likedusers,myuser._id]})
         }else{
          const updatedthreads=threads.map((thread:any)=>{
            if(thread._id===_id){
              return {...thread,likedusers:[...likedusers,myuser._id]}
            }else{
              return thread;
            }
         
           })
           dispatch(setThreads(updatedthreads));
         }
        try{
        const res=await fetch(`/api/thread/updatethread`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            userid:myuser._id,
            threadid:_id,
            action:"like"
          })
        })
        const data=await res.json();
        if(!data.success){
            toast.error("Something went wrong");
         }
        }catch(err){
          console.log(err);
        }
      }
       



      async function dislikeThread(){
         if(fromthreadpage){
          setThread({...thread,likedusers:likedusers.filter((id:string)=>id!==myuser._id)})
         }else{
          const updatedthreads=threads.map((thread:any)=>{
            if(thread._id===_id){
              const newlikedusers=likedusers.filter((e)=>e!==myuser._id)
              return {...thread,likedusers:[...newlikedusers]}
            }else{
              return thread;
            }
           
          })
          dispatch(setThreads(updatedthreads));
         }
        try{
          const res=await fetch(`/api/thread/updatethread`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              userid:myuser._id,
              threadid:_id,
              action:"dislike"
            })
          })
          const data=await res.json();
          if(!data.success){
            toast.error("Something went wrong");
          }
          }catch(err){
            console.log(err);
          }
        }
       
      
  return (
    <article className=' border-b-[1px] border-dark-4  pb-3  w-full flex  '>
      
       {
        show?(<CommentForm thread={thread} setThread={setThread} fromthreadpage={fromthreadpage} threadid={_id} hideform={()=>setShow(false)} user={user}/>):(<div className=' flex gap-2 '>
        <div className=' flex flex-col  items-center'>
         <Link href={`/profile/${user._id}`} className='  relative h-11 w-11'>
             <Image
                  src={user.profilepic}
                  alt='user_image'
                  fill
                  className='cursor-pointer rounded-full'
                />
               
         </Link>
        <div className='thread-card_bar' />
        </div>
             
        <div className='  w-[calc(100%-2.75rem)]'>
          <div className=' flex flex-col '>
        <h1 className=' text-[20px] text-light-1 font-bold'>{user.username}</h1>
        <h1 className=' m text-slate-700'>{date.format(new Date(createdat), 'YYYY/MM/DD HH:MM')}</h1>
          </div>
        <Link href={`/thread/${_id}`}><p className=' text-light-2'>{content}</p></Link>
         {/* {
              medialinks?.length>0 && (
                  <MediaCard medialinks={medialinks}/>
              )
         } */}
  
  
            <div className=' mt-4 flex gap-3.5'>
                  <button onClick={likedusers.indexOf(myuser._id)>-1?dislikeThread:likeThread}>
                  <Image
                    src={likedusers.indexOf(myuser._id)>-1?'/assets/heart-filled.svg':'/assets/heart-gray.svg'}
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                  </button>
                 <button onClick={()=>setShow(true)} >
                 
                    <Image
                      src='/assets/reply.svg'
                      alt='heart'
                      width={24}
                      height={24}
                      className='cursor-pointer object-contain'
                    />
                 </button>
               
                 <button onClick={()=>{
                   dispatch(setrepostThread({content:content,medialinks:medialinks}))
                   router.push("/create-thread?repost=true")
                 }}>
                 <Image
                    src='/assets/repost.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                 </button>
                 <button onClick={()=>{
                    navigator.clipboard.writeText(`${typeof window!=='undefined' && window.location.origin}/thread/${_id}`)
                    toast.success("Link copied to clipboard")
                 }}>
                  <Image
                    src='/assets/share.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                  </button>
               </div>
               <div className=' text-slate-700 mt-4 flex gap-3.5'>
                  <h1>{comments.length} replies</h1>
                  <h1>{likedusers.length} likes</h1>
               </div>
               </div>
        </div>)
       }  
    </article>
  )
}

export default Threadcard


