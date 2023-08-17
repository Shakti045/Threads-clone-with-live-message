'use client'
import Threadcard from "@/components/Cards/Threadcard";
import { useEffect, useState } from "react";
import Loader from "./loading";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { setUser } from "@/redux/slices/userslice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setThreads } from "@/redux/slices/threadslice";
export default   function Home() {
   const {threads}:{threads:any}= useSelector((state:RootState)=>state.thread);
   const [loading,setLoading] = useState<boolean>(true);
   const [hasmore,sethasmore]=useState(false);
   const [skipamount,setskipamount]=useState(0);
   const {user}=useSelector((state:RootState)=>state.user);
   const dispatch = useDispatch<AppDispatch>();
   async function getdata(){
    setLoading(true);
    try{
      const res = await fetch(`/api/getposts?skip=${skipamount}`);
      const data = await res.json();
        // console.log(data?.hasmorethread)
        // console.log(data?.skipamount)
        // sethasmore(data?.hasmorethread);
        // setskipamount(data?.skipamount)
  
          // console.log("setuser called")
          dispatch(setUser(data.myuser));
   
        // dispatch(setThreads(data.threads));
        dispatch(setThreads(data.threads));
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
   }
   useEffect(()=>{
      getdata();
   },[])
  return (
    <div className=" flex flex-col gap-4 ">
      {
        loading?(<Loader/>):(
          <>
          {
            threads?.map((thread:any)=>(
              <Threadcard  key={thread._id} 
              _id={thread._id}  content={thread?.content} medialinks={thread?.medialinks} user={thread?.user} comments={thread?.comments} likedusers={thread?.likedusers}  createdat={thread?.createdat}  />
            ))
          }
          {
            hasmore && (
              <button onClick={getdata} className=" text-blue text-center  mt-3">Load More</button>
            )
          }
          </>
        )
      }
    </div>
  )
}
