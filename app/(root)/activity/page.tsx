import { currentUser } from "@clerk/nextjs"
import { fetchuserfromclerkid } from "@/libs/actions/user.actions"
import { redirect } from "next/navigation"
import { getuseractivity } from "@/libs/actions/user.actions"
import Image from "next/image"
import Link from "next/link"
import date from "date-and-time"
const Activitypage = async () => {
  const user=await currentUser();
if(!user){
  redirect('/sign-in')
}
const userfromclerkid:any=await fetchuserfromclerkid(user.id);
if(!userfromclerkid){
  redirect('/sign-in')
}
const data:any=await getuseractivity(userfromclerkid._id);
console.log(data);
  return (
    <div className=' w-full flex flex-col gap-5  '>
      {/* <h1 className=' text-light-2 text-[20px]'>Activity</h1> */}
       <div className=" flex flex-col gap-5">
        {
          data.activity.map((activity:any)=>{
           return <Link key={activity._id}  href={`/thread/${activity.thread}`} className= " p-3 rounded-md  border-b-[1px]  border-dark-4 text-white flex gap-2 ">
            <div className="flex gap-4 items-center w-full "> 
              <div className="  relative h-10 w-10">
              <Image
                src={activity.user.profilepic}
                alt='user_image'
                fill
                className='cursor-pointer rounded-full'/>
              </div>
               <div className=" flex flex-col  w-[calc(100%-3.5rem)]">
                {/* <h1>@{activity.user.username}</h1>
                <h1>{activity.user.name}</h1>
                <h1>{date.format(new Date(activity.createdat), 'YYYY/MM/DD HH:mm:ss')}</h1>
                <h1>Comment on your post</h1>
                <h1>{activity.content}</h1> */}
                <h1>@{activity.user.username} comment on your thread on {date.format(new Date(activity.createdat), 'YYYY/MM/DD HH:mm:ss')}</h1>
               </div>
           </div>
           </Link>
          })
        }
       </div>
    </div>
  )
}

export default Activitypage