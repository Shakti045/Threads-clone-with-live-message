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
      <section className="  max-h-full h-full w-full overflow-scroll ">
         <Menubar clerkid={user.id} profilepic={myuser?.profilepic} />
      </section>
  )
}

export default LeftSidebar
