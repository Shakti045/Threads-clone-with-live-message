import { getallusers } from "@/libs/actions/chat.actions"
import Link from "next/link";
import Avatar from "../card/Avatar";
const FriendsBar = async() => {
    const users:any=await JSON.parse(JSON.stringify(await getallusers()))
  return (
    <div className=" text-white w-full h-full p-4">
        <div>
          <h1 className=" font-bold text-[20px]">Friends</h1>
        </div>
        <div className=" mt-4 flex flex-col gap-3">
            {
               users?.map((user:any)=>{
                   return (
                    <Link key={user._id}  href={`/createconversation/${user?._id}`}>
                      <div className=" hover:bg-dark-4 p-2 rounded-md flex gap-2 items-center">
                         <div className=" relative min-h-[50px] min-w-[50px] h-[50px] w-[50px]">
                         <Avatar showactive={true} clerkid={user?.clerkid} url={user?.profilepic} />
                         </div>
                         <h1 className=" ">{user?.name} </h1>
                      </div>
                    </Link>
                   )
               }) 
            }
        </div>
    </div>
  )
}

export default FriendsBar;