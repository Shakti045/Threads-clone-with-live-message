'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import date from "date-and-time"
import CommentForm from '../forms/CommentForm'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Loader from '@/app/(root)/loading'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
interface props{
    user:any,
    createdat:string,
    content:string,
    _id:string,
    subcomments:any,
    likedusers:any,
    setThread:any,
    thread:any,

}
const CommentCard = ({_id,user,createdat,content,subcomments,likedusers,setThread,thread}:props) => {
   const {user:myuser}:{user:any}=useSelector((state:RootState)=>state.user);
    const [show,setShow] = useState<boolean>(false);
   const [showsubcomments,setshowsubcomments]=useState(false);
   const [loading,setLoading]=useState(true);
   const [data,setdata]=useState([])
    const addsubcomment=async (content:any) => {
      const loadingtoast=toast.loading("Adding subcomment")
      try{
         const res=await fetch("/api/comment/createsubcomment",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              content,
              commentid:_id,
              user:myuser._id
            })
         })
          const result=await res.json();
          if(result.success){
            toast.success("Comment added")
            setshowsubcomments(false);
            setThread({...thread,comments:thread.comments.map((e:any)=>{
              if(e._id===_id){
                return {...e,subcomments:[...e.subcomments,result.subcomment]}
              }else{
                return e;
              }
            })})
          }
      }catch(err){
        console.log(err)
        toast.error("Failed to add subcomment")
      }finally{
        toast.dismiss(loadingtoast)
      }
    }
    
    async function getsubcomments(){
      try{
        const res=await fetch(`/api/comment/getsubcomments`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            commentid:_id
          })
        })
        const result=await res.json();
        if(result.success){
          console.log(result.subcomments)
          setdata(result.subcomments)
        }
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
    }
   

  return (
    <article className='  relative border-b-[1px] border-dark-4  pb-3  w-full flex  '>
           {
             show?(<CommentForm addsubcomment={addsubcomment} fromcomments={true}  hideform={()=>setShow(false)} user={user}
              threadid={_id}
              />):(
                <div className=' w-full flex flex-col gap-3'>
                <div className=' flex gap-2 '>
                <div className=' flex flex-col  items-center'>
                 <div className='  relative h-11 w-11'>
                     <Image
                          src={user?.profilepic}
                          alt='user_image'
                          fill
                          className='cursor-pointer rounded-full'
                        />
                       
                 </div>
                <div className='thread-card_bar' />
                </div>
                     
                <div className='  w-[calc(100%-2.75rem)]'>
                  <div className=' flex flex-col '>
                <h1 className=' text-[20px] text-light-1 font-bold'>{user?.username}</h1>
                <h1 className=' m text-slate-700'>{date.format(new Date(createdat), 'YYYY/MM/DD HH:MM')}</h1>
                  </div>
                <div><p className=' text-light-2'>{content}</p></div>
                    <div className=' mt-4 flex gap-3.5'>
                          <button onClick={()=>{}}>
                          <Image
                            src='/assets/heart-gray.svg'
                            alt='heart'
                            width={24}
                            height={24}
                            className='cursor-pointer object-contain'
                          />
                          </button>
             
                         <button onClick={()=>setShow(true)}>
                            <Image
                              src='/assets/reply.svg'
                              alt='heart'
                              width={24}
                              height={24}
                              className='cursor-pointer object-contain'
                            />
                        </button>
                          {
                            subcomments.length>0 && (
                               <>
                                 {
                                    showsubcomments?(<>
                                     <button className=' text-blue' onClick={()=>{setshowsubcomments(false)}}>Hide Subcomments</button>
                                    </>):(<>
                                     <button className=' text-blue' onClick={()=>{setshowsubcomments(true);getsubcomments()}}>Show Subcomments</button>
                                    </>)
                                 }
                               </>
                            )

                          }
                        </div>
                       <div className=' text-slate-700 mt-4 flex gap-3.5'>
                           <h1>{subcomments.length} replies</h1>
                          <h1>{likedusers.length} likes</h1> 
                       </div>
                       </div>
                     </div>
                     <div className=' w-full text-white flex flex-col gap-2'>
                    {
                        showsubcomments && (
                          <>
                           {
                            loading?(<Loader/>):(
                              <>
                              {
                                data.map((subcomment:any)=>{
                                  return <div className=' flex gap-2 '>


                          <div className=' flex flex-col items-center'>
                               <div className='  relative h-11 w-11'>
                                <Image    src={subcomment.user.profilepic} alt='user_image' fill  className='cursor-pointer  rounded-full' />
                              </div>
                              <div className=' min-h-[15px] thread-card_bar' />
                           </div>

                           <div className='w-[calc(100%-5rem)]'>
                              <h1>{subcomment.user.username}</h1>
                               <h1>{subcomment.content}</h1>
                               </div>
                          </div>
                                  
                                })

                              }
                             </>
                            )
                         
                           }
                          </>
                        )
                       }
                     </div>
                     </div>
             )
           }
    
    </article>

  )
}

export default CommentCard;