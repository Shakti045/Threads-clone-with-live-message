import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Createthreadpage from "@/components/forms/CreateThread";

const Createthread = async () => {
    const user:any=await currentUser();
    if(!user){
      return redirect("/sign-in")
    }
  return (
    <Createthreadpage id={user.id}/>
  )
}

export default Createthread