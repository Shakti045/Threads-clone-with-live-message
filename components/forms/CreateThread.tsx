'use client'
import {useForm} from 'react-hook-form'
import ImageUpload from '@/components/shared/ImageUpload'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import {AiOutlineDelete} from "react-icons/ai"
import {toast} from "react-hot-toast"
import { createthread } from '@/libs/actions/thread.actions'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
const Createthreadpage =  ({id}:{id:string}) => {
   const {thread}:{thread:any}=useSelector((state:RootState)=>state.threadrepost);
    const repost:any=useSearchParams()!.get("repost");
    const [urls,setUrls] =useState<string[]>([]);
    function handledeletemedia(index:number){
        const newurls = urls.filter((url,i)=>i!==index)
        setUrls(newurls)
    }
    const {
     register,
     handleSubmit,
     formState:{errors,isSubmitSuccessful},
     setValue,
     reset
    }=useForm();

    async function createpost(data:any) {
         if(data.content==="" && urls.length===0){
            return toast.error("Please add something")
         }
         const loading=toast.loading("Creating thread")
         const result=await createthread({
            clerkid:id,
            content:data.content,
            medialinks:urls
         })
         if(result.success){
            toast.success("Thread created")
            reset({
               content:""
            })
            setUrls([]);
         }else{
            toast.error(result.message)
         }
         toast.dismiss(loading);
    }

     useEffect(()=>{
         if(repost==="true"){
             setValue("content",thread?.content);
             setUrls(thread?.medialinks);
         }else{
            reset({
               content:""
             })
             setUrls([]);
         }
     },[])

  return (
    <div className=' w-full  flex flex-col gap-10'>
        <h1 className=' font-bold text-[25px] text-light-2'>Create A Thread</h1>
        <div className=' flex gap-3 flex-col'>
            <label className=' text-light-1 '>Content</label>
            <textarea rows={5} className=' w-full bg-dark-1 text-light-1 p-4 rounded-lg outline-none border-light-2 border-[1px]' placeholder='Enter your content here...'
             {
                ...register("content",{required:false})
             } 
            ></textarea>
        </div>
          <ImageUpload imagehandler={(url:string)=>setUrls([...urls,url])} button={<div>
            <button className=' bg-primary-500 text-light-1 font-bold py-2 px-4 rounded-lg'>Add Media +</button>
           </div>}/>
           <div className=' grid grid-cols-3 gap-2'>
            {
                urls.map((url:any,index)=>(
                  <div key={index} className=' relative w-[200px] h-[200px] ' >
                    {
                     url?.resource_type==='video'?(
                        <ReactPlayer url={url?.url} controls={true} width='100%' height='100%'/>
                     ):(
                        <img src={url?.url}  className=' absolute top-0 right-0 bottom-0 left-0 max-w-[100%] max-h-[100%] mx-auto my-auto overflow-clip' alt='image'/>
                     )
                    }
                    <div onClick={()=>handledeletemedia(index)} className=' cursor-pointer absolute top-[-10px] right-[-5px] bg-red-500 p-2 rounded-lg  '>
                         <AiOutlineDelete/>
                    </div>
                  </div>
                  )
                )
            }
           </div>
            <button onClick={handleSubmit(createpost)}  className=' bg-primary-500 text-light-1 font-bold py-2 px-4 rounded-lg'>Create</button>
    
    </div>
  )
}

export default Createthreadpage