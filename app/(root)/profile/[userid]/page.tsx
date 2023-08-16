'use client'
import Image from "next/image"
import { profileTabs } from "@/constants"
import { useEffect, useState } from "react"
import Loader from "../../loading"
import Userinfo from "@/components/profile/Userinfo"
import UserThreads from "@/components/profile/UserThreads"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import { toast } from "react-hot-toast"
import UserTagged from "@/components/profile/UserTagged"
import UserReplies from "@/components/profile/UserReplies"
const Profilepage = ({params,searchParams}:any) => {
  const [user,setUser] = useState<any>({});
  const [loading,setLoading] = useState<boolean>(true);
  const {user:myuser}:{user:any}=useSelector((state:RootState)=>state.user);
  const [ownprofile,setOwnprofile] = useState<boolean>(false);
  async function getuser(){
    const userid = searchParams.myid==="true"?myuser._id:params.userid ;
    console.log(userid)
    if(userid===myuser._id){
      setOwnprofile(true);
    }
    try{
      const res = await fetch(`/api/user/getprofile/${userid}`);
      const data = await res.json();
      console.log(data)
      if(data.success){
      
        setUser(data.user);
      }
    }catch(err){
      console.log(err) 
    }finally
    {
      setLoading(false);
    }
  }
  const [activeTab,setActiveTab] = useState<number>(0)

  async function deletethread(threadid:string){
    const loadingtoast = toast.loading("Deleting thread");
    try{
      const res = await fetch(`/api/thread/updatethread`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          threadid,
          userid:myuser._id
        })
      });
      const data = await res.json();
      if(data.success){
        toast.success("Thread deleted");
        setUser({...user,threads:user.threads.filter((thread:any)=>thread._id!==threadid)})
      }else{
        toast.error("Failed to delete thread");
      }
    }catch(err){
      console.log(err)
      toast.error("Failed to delete thread");
    }finally  {
      toast.dismiss(loadingtoast);
    }
  }



  useEffect(()=>{
     getuser(); 
  },[])
  return (
        <>
         {
            loading?(<Loader/>):
            (
              <div className=" w-full flex flex-col gap-7">
               <section>
                <Userinfo ownprofile={ownprofile} bio={user?.bio} name={user?.name} username={user?.username} profilepic={user?.profilepic}/>
               </section> 
               <section>
               <div className=" w-full flex lg:flex-row flex-col gap-3  bg-dark-2 justify-between">
              {
                profileTabs.map((tab,index)=>{
                  return(
                    <div key={index} onClick={()=>setActiveTab(index)} className={
                      `py-4 px-4 rounded-md  flex gap-2 cursor-pointer items-center text-[20x]
                       ${
                          activeTab===index && "bg-dark-4" 
                       }
                      `
                    }>
                      <Image src={tab.icon} alt={tab.label} width={24} height={24}/>
                      <p className=" text-light-1">{tab.label}</p>
                      <div className=" bg-purple-600  px-2 rounded-md text-white">{
                        index===0?user?.threads?.length:index===1?user?.likedthreads.length:0
                      }</div>
                    </div>
                  )
                })
              }
             </div>
               </section>
               <section>
                 {
                    activeTab===0 && (<UserThreads deletethread={deletethread} ownprofile={ownprofile} threads={user?.threads}/>)
                 }
                 {
                    activeTab===1 && (<UserReplies threads={user?.likedthreads}/>)
                 }
                 {
                    activeTab===2 && (<UserTagged/>)
                 }
               </section>
             </div>
            )
         }
        </>
  )
}

export default Profilepage