import { fetchuserfromclerkid } from "@/libs/actions/user.actions";
import Menubar from "./Menubar"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
const LeftSidebar = async () => {
  const user:any=await currentUser()
 
  if(!user){
    return redirect('/sign-in');
  }
  const myuser=await fetchuserfromclerkid(user.id);
  return (
      <section className=" h-full w-full  ">
         <Menubar clerkid={user.id} profilepic={myuser?.profilepic} />
      </section>
  )
}

export default LeftSidebar
