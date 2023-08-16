'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {FiImage} from "react-icons/fi"
import Image from "next/image"
import ImageUpload from '../shared/ImageUpload';
import {toast} from 'react-hot-toast';
import { createuser,updateuserdetails } from '@/libs/actions/user.actions';
import { useRouter } from 'next/navigation';
interface props{
    id:string,
    username:string,
    bio:string,
    name:string,
    image:string,
    editmode?:boolean
}
const ProfileForm = ({id,username,bio,name,image,editmode}:props) => {
    const [imageurl,setimageurl]=useState('');
    const router=useRouter();
    const { 
          register,
          handleSubmit,
          formState: { errors },
           setValue,
           getValues
         }:{register:any,handleSubmit:any,formState:{errors:any},setValue:any,getValues:any}
     = useForm();
     
     async function handleuser(data:any) {
        data.clerkid=id;
        const loadingtoast=toast.loading("Creating user");
        const result:any=await createuser(data);
        if(result.success){
            toast.success("User created successfully");
            router.push("/");
        }else{
            toast.error(result.message);
        }
        toast.dismiss(loadingtoast);
     }



     async function updateuserdetail(data:any) {
        data.clerkid=id;
        if(data.image===image && data.name===name && data.username===username && data.bio===bio){
            return toast.error("Please change something to update");
        }
        let tobeupdated:any={};
        if(data.image!==image){
            tobeupdated.image=data.image;
        }
        if(data.name!==name){
            tobeupdated.name=data.name;
        }
        if(data.username!==username){
            tobeupdated.username=data.username;
        }
        if(data.bio!==bio){
            tobeupdated.bio=data.bio;
        }
        tobeupdated.clerkid=id;
        const loadingtoast=toast.loading("Updating user");
        const result:any=await updateuserdetails(tobeupdated);
        if(result.success){
            toast.success("User Updated successfully");
          router.back();
        }else{
            toast.error(result.message);
        }
        toast.dismiss(loadingtoast);
     }
     

     useEffect(()=>{
        register("image",{required:{value:true}});
        setValue("image",image);
        setValue("name",name);
        setValue("username",username);
        setValue("bio",bio)
        setimageurl(image);
     },[]);


  return (
    <div className='  rounded-md w-full  flex flex-col gap-10 justify-start'>
    <div className=' flex flex-col gap-2'>
       <div className=' flex gap-5 items-center'>
       {
        imageurl?(
           
        <Image height={90} width={90} src={imageurl} alt='profile'       className='rounded-full object-contain'   />
         
        ):( <div className=' p-4 rounded-full bg-dark-4 text-white text-[20px]  w-fit'>
           <FiImage/>
           </div>)
       }
       <ImageUpload  imagehandler={(url:any)=>{
        setimageurl(url?.url)
        setValue("image",url?.url)
       }} button={<p className=' text-blue'>Upload or change Image</p>}/>
      </div>
       {
        errors.image && (
            <p className=' text-pink-700'>Please upload a image</p>
        )
      }
    </div>
     <form className=' flex flex-col gap-10'>
     <div className=' flex flex-col  gap-2 justify-start'>
        <label className=' text-gray-200 '>Name</label>
        <input placeholder='Enter your name' className='account-form_input p-3 rounded-md  outline-none  no-focus  '
         {
            ...register("name",{required:{value:true,message:"Name is required"}})
         }
        />
        {
            errors.name && (
                <p className=' text-pink-700'>{errors.name.message}</p>
            )
        }
      </div>
      <div className=' flex flex-col gap-2 justify-start '>
        <label className=' text-gray-200 '>User Name</label>
        <input placeholder='Enter your username' className='account-form_input p-3 rounded-md  outline-none  no-focus  '
         {
            ...register("username",{required:{value:true,message:"User Name is required"},minlength:{value:3,message:"Please provide username of greater than or equal to with 3 characters "}})
         }
        />
        {
            errors.username && (
                <p className=' text-pink-700'>{errors.username.message}</p>
            )
        }
      </div>
      <div className=' flex flex-col gap-2  justify-start'>
        <label className=' text-gray-200 '>Write something about yourself</label>
        <textarea rows={6} placeholder='Write something about yourself' className='account-form_input p-3 rounded-md  outline-none  no-focus  '
         {
            ...register("bio",{required:{value:true,message:"Please write something about yourself"}})
         }
        />
        {
            errors.bio && (
                <p className=' text-pink-700'>{errors.bio.message}</p>
            )
        }
      </div>
     {
    editmode?(<button onClick={handleSubmit(updateuserdetail)} type='submit'  className=' text-gray-200 p-2 rounded-lg bg-purple-600 hover:bg-purple-900'>SAVE CHANGES</button>):(
        <button  onClick={handleSubmit(handleuser)}  type='submit'  className=' text-gray-200 p-2 rounded-lg bg-purple-600 hover:bg-purple-900'>SUBMIT</button>
    )
     }
     </form>
    </div>
  )
}

export default ProfileForm;