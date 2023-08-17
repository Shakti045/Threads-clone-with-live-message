'use client'
import React, { useEffect, useState } from 'react'
import {HiPaperAirplane , HiPhoto} from "react-icons/hi2"
import ImageUpload from '@/components/shared/ImageUpload'
import EmojiPicker from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { pusherClient } from '@/utils/pusher/pusher';
const MessageInput = ({currentuser,conversationid}:{currentuser:string,conversationid:string}) => {
    const [showemoji,setshowemoji]=useState(false);
    function handleemoji(emoji:any){
        const {text}=getValues();
        setValue("text",text+emoji?.emoji)
    }
    const {
        setValue,
        getValues,
        handleSubmit,
        register,
        formState:{isSubmitSuccessful,errors},
        reset,
        watch
    }=useForm();

//  const channel=pusherClient.subscribe(conversationid);
// async function handlechange(e:any){
//   await channel.trigger('client-typing',true);
// }

// channel.bind('typing',(value:boolean)=>{
//     console.log("called");
    
// })

const handlemediamessage=async({url,resource_type}:{url:string,resource_type:string})=>{ 
    const loading=toast.loading(`Sending ${resource_type}...`)
    try{
     const result=await fetch('/api/message/createmessage',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                createdby:currentuser,
                conversationid:conversationid,
                media:{
                    resource_type:resource_type,
                    secure_url:url
                },
            })          
           })
           const responce=await result.json();
           if(responce.Success){
                 toast.success(`${resource_type} sent successfully`);
                 reset();
            }else{
                toast.error(responce.Message);
            }
    }catch(err){
      console.log(err);
      toast.error('Failed to send message');
    }finally{
        toast.dismiss(loading);
    }  
     
}



async function createmessage(data:any){
    //    const loading=toast.loading('Sending message...')
        try{
         const result=await fetch('/api/message/createmessage',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    createdby:currentuser,
                    conversationid:conversationid,
                    text:data.text,
                })          
               })
               const responce=await result.json();
               if(responce.Success){
                    //  toast.success('Message sent successfully');
                     reset();
                }else{
                    toast.error(responce.Message);
                }
        }catch(err){
          console.log(err);
          toast.error('Failed to send message');
        }finally{
            // toast.dismiss(loading);
        }    
 }

  return (
    <>
    <div className=' absolute z-50 bottom-[5rem]'>
           
    {
        showemoji && (
            <EmojiPicker  onEmojiClick={(emoji)=>handleemoji(emoji)} height={350} theme={Theme.DARK}   />
        )
    }
    </div>
    
    <div className=' w-full h-20  flex  gap-4 items-center p-4 border-t-[1px] border-r-slate-50'>

       <ImageUpload button={<div className='text-white bg-sky-700 rounded-full p-2 '><HiPhoto/></div>} imagehandler={handlemediamessage}/>
       <button onClick={()=>setshowemoji(!showemoji)} className=' '>😊</button>
     <form onSubmit={handleSubmit(createmessage)} className=' flex gap-4   items-center w-full'>
     <input placeholder='Enter your message here' className=' w-full text-white p-2  px-5 bg-dark-4 outline-none rounded-3xl'
        {
            ...register("text",{required:true})
        } 
        // onChange={handlechange}
       />
      <button className='  text-white bg-sky-700 rounded-full p-2 '><HiPaperAirplane/></button>
     </form>
    </div>
    </>
  )
}

export default MessageInput