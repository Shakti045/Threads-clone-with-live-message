'use client'
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { setThreads } from "@/redux/slices/threadslice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
interface props{
    user:any,
    hideform:()=>void,
    threadid:string,
    fromthreadpage?:boolean,
    setThread?:any
    thread?:any,
    fromcomments?:boolean,
    addsubcomment?:any
}
const CommentForm = ({user,hideform,threadid,fromthreadpage,thread,setThread,addsubcomment,fromcomments}:props) => {
    const dispatch:AppDispatch = useDispatch<AppDispatch>();
    const {user:myuser}:{user:any}=useSelector((state:RootState)=>state.user);
    const {register,handleSubmit,formState:{errors},reset} = useForm();
    const {threads} = useSelector((state:RootState)=>state.thread);
    async function createcomment(data:any){
         if(fromcomments){
           await addsubcomment(data.content);
           reset({
            content:""
          })
          hideform()
            return;
         }
        const loadingtoast = toast.loading("Creating comment")
      try{
        const res = await fetch("/api/comment/createcomment",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            content:data.content,
            threadid,
            user:myuser._id,
          })
        })
        const result = await res.json()
        if(result.success){
          toast.success("Comment created successfully")
            if(fromthreadpage){
                setThread({...thread,comments:[...thread.comments,result.comment]})
            }else{
              const newcomment = result.comment;
              const updatedthreads:any=threads.map((thread:any)=>{
                     if(thread._id===newcomment?.thread){
                         return {
                             ...thread,
                             comments:[...thread.comments,newcomment._id]
                         }
                     }else{
                         return thread
                     }
                 })
                 dispatch(setThreads(updatedthreads));
            }
          reset({
            content:""
          })
          hideform()
        }else{
          toast.error(result.message)
        }
      }catch(err){
        console.log(err)
        toast.error("Error while creating comment")
      }finally{
        toast.dismiss(loadingtoast)
      }
    }
  return (
     
           <div className="  w-full  bg-dark-3 p-3 border-[1px] border-dark-4 rounded-md">
          <div className="flex gap-2">
         <Image src={myuser.profilepic} alt="user" width={40} height={40} className="rounded-full w-fit h-fit"/>
         <div className=" w-[calc(100%-3.5rem)]  flex flex-col ">
         <h1 className=" font-semibold text-[20px] text-blue">@{myuser.username}</h1>
         <h1 className=" text-pink-700">replying to  @{user.username}</h1>
         <form onSubmit={handleSubmit(createcomment)} className=" flex flex-col mt-2 ">
         <textarea rows={5} className="  outline-none    bg-dark-4 text-light-1 p-2 rounded-md" placeholder="Reply to this thread" {...register("content",{required:true})}></textarea>
         {
                errors.content && <p className=" text-red-600">This field is required</p>
         }
           <div className=" w-full justify-end  flex gap-3">
           <button className=" bg-blue text-white rounded-md p-2 mt-2" type="submit">Post Reply</button>
            <button onClick={hideform} className=" bg-red-600  text-white rounded-md p-2 mt-2" type="button">Cancel</button>
           </div>
         </form>
         </div>
       </div>
    </div>

  )
}

export default CommentForm;