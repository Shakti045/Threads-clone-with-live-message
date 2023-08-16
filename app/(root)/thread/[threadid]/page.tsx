'use client'
import Loader from "@/app/(root)/loading"
import { useState ,useEffect } from "react";
import { toast } from "react-hot-toast";
import Threadcard from "@/components/Cards/Threadcard";
import MediaCard from "@/components/Cards/MediaCard";
import CommentCard from "@/components/Cards/CommentCard";
const Threadpage = ({params}:{params:{threadid:string}}) => {
const [loading, setLoading] = useState(true);
const {threadid} = params
const [thread, setThread] = useState<any>('');

async function getThread(threadid:string) {
  try{
    const result= await fetch(`/api/getthread/${threadid}`)
    const data = await result.json()
    if(data.success){
      console.log(data.thread)
      setThread(data.thread);
    }
  }catch(err){
    console.log(err)
    toast.error("Error while fetching thread")
  }finally{
    setLoading(false)
  }
}




useEffect(()=>{
  getThread(threadid)
},[threadid]);
  return (
    <div>
      {loading ? <Loader/> :
         <div>
             <Threadcard thread={thread} fromthreadpage={true} setThread={setThread} key={thread._id} 
              _id={thread._id}  content={thread?.content} medialinks={thread?.medialinks} user={thread?.user} comments={thread?.comments} likedusers={thread?.likedusers}  createdat={thread?.createdat}  />
              {/* <MediaCard medialinks={thread?.medialinks}/> */}
              {
                thread?.comments?.length===0
                ?(<h1 className=' text-light-1 text-center'>No comments yet</h1>):(
                  <div className=" flex flex-col gap-3 mt-8">
                  <h1 className="  text-light-1 text-center">Comments</h1>
                  {
                    thread?.comments?.map((comment:any)=>{
                      return <CommentCard  setThread={setThread} thread={thread} key={comment._id}  _id={comment._id}
                      likedusers={comment.likedusers} content={comment.content} createdat={comment.createdat} user={comment.user} subcomments={comment.subcomments}   />
                      
                    })
                  }
                </div>
                )
              }
        </div>
      }
    </div>
  )
}

export default Threadpage