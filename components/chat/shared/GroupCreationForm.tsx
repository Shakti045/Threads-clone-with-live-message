'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FiImage } from 'react-icons/fi';
import ImageUpload from '@/components/shared/ImageUpload';
import { useForm } from 'react-hook-form';
import Select from '../Inputs/Select';
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast';
const GroupCreationForm = ({users}:{users:any[]}) => {
    const [imgurl,setimgurl]=useState('');
    const router=useRouter();
    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState:{errors},
        reset
    }=useForm();

    async function creategroup(data:any){
        const loadingtoast=toast.loading('Creating group');
       try{
        const res=await fetch('/api/message/group',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const result=await res.json();
        if(result.Success){
            toast.success('Group created successfully');
            router.push(`/conversation/${result.groupid}`);
        }
       }catch(err){
           console.log(err);
           toast.error('Something went wrong');
       }finally{
        toast.dismiss(loadingtoast);
       }
    }

    useEffect(()=>{
        register('members',{required:true});
        register('groupicon',{required:true});

    },[]);
  return (
    <div className='  max-sm:h-[50vh]  bg-dark-2 p-4 rounded-md  w-full h-full text-white  flex flex-col gap-4'>
      <div className=' flex  gap-4 items-center'>
         {
            imgurl?(<Image alt='groupicon' src={imgurl} height={80} width={80} className=' rounded-full'/>):(<div className=' p-4 rounded-full bg-dark-4 text-white text-[20px]  w-fit'>
            <FiImage/>
            </div>)
         }
         <ImageUpload imagehandler={(url:any)=>{
            setimgurl(url?.url);
            setValue("groupicon",url?.url);
         }} button={<p className='  text-blue  '>Upload or change group icon</p>}/>
      </div>
      {
            errors.groupicon&&<p className=' text-red-500'>Group icon is required</p>
      }
      <form className=' flex flex-col gap-5' onSubmit={handleSubmit(creategroup)}>
        <div className=' flex flex-col gap-1'>
            <label htmlFor='groupname'>Group Name</label>
            <input type='text' id='groupname' className=' outline-none p-3 w-full  bg-dark-4 rounded-md' {...register('groupname',{required:true})}/>
            {
                errors.groupname&&<p className=' text-red-500'>Group name is required</p>
            }
        </div>
        <Select
            label='Select Members'
            options={users.map((user:any) => ({ 
                value: user._id, 
                label: user.name 
              }))} 
             onChange={(value:any)=>setValue('members',value)}      
          />
          {
            errors.members&&<p className=' text-red-500'>Select atleast one member</p>
          }

          <div className=' mt-5 w-full justify-end gap-4 flex'>
            <button onClick={()=>router.back()} className='p-2 bg-red-500 rounded-md text-white '>
                Go Back
            </button>
            <button type='submit'  className=' p-2 bg-blue rounded-md text-white '>Create Group</button>
          </div>
      </form>
    </div>
  )
}

export default GroupCreationForm