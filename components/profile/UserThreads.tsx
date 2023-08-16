'use client'
import Threadcard from "../Cards/Threadcard"
const UserThreads = ({threads,ownprofile,deletethread}:{threads:Array<any>,ownprofile:boolean,deletethread:(threadid:string)=>void}) => {
  return (
    <div className=" w-full flex flex-col gap-3">
        {
            threads?.map((thread:any)=>(
                <div key={thread._id} className=" relative w-full">
                <Threadcard   
                _id={thread._id}  content={thread?.content} medialinks={thread?.medialinks} user={thread?.user} comments={thread?.comments} likedusers={thread?.likedusers}  createdat={thread?.createdat}  />
                 {
                    ownprofile && (
                        <div className=" absolute top-0 right-0">
                            
                            <button onClick={()=>deletethread(thread._id)} className=" bg-dark-3 text-light-1 px-2 py-1 rounded-md">Delete</button>
                        </div>
                    )
                 }
                </div>
            )
            )
        }
    </div>
  )
}

export default UserThreads

