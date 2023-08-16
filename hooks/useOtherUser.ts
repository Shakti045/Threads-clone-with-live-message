import { useMemo } from "react"
export const useOtherUser=(users:any[],currentUserId:string)=>{
    // console.log("Printing in memo")
    // console.log(users,currentUserId)
  const data=useMemo(()=>{
    const otheruser=users.find((user:any)=>user._id!==currentUserId);
    return otheruser;  
  },[users,currentUserId])

  return data;
}