'use client'
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store/store"
interface props{
    profilepic:string,
    username:string,
    name:string,
    bio:string,
    ownprofile:boolean
}
import Image from "next/image"
import { setprofile } from "@/redux/slices/profileslice"
const Userinfo = ({profilepic,username,name,bio,ownprofile}:props) => {
  const router = useRouter();
  const dispatch:AppDispatch = useDispatch<AppDispatch>();
  return (
    <div className=" w-full flex flex-col gap-3 text-light-1">
         <div className=" w-full flex justify-between">
         <div className=" flex gap-3">
          <div  className='  relative h-11 w-11'>
             <Image
                  src={profilepic}
                  alt='user_image'
                  fill
                  className='cursor-pointer rounded-full'
                />
               
          </div>
          <div className=" flex flex-col ">
            <h1 className=' text-[20px] text-light-1'>@{username}</h1>
            <h1 className=' text-slate-700'>{name}</h1>
          </div>
         </div>
         {
            ownprofile && (
                <button onClick={()=>{
                  dispatch(setprofile({profilepic:profilepic,name:name,username:username,bio:bio}));
                  router.push("/editprofile")
                }} className=" w-fit h-fit bg-dark-3  text-blue px-2 py-1 rounded-md">Edit Profile</button>
            )
          }
         </div>
         <h1>{bio}</h1>
    </div>
  )
}

export default Userinfo;