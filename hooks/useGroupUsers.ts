import { useMemo } from "react";
export const useGroupUsers=(users:any[],currentUserId:string)=>{
  const otherusers=useMemo(()=>{
    return users.filter((user)=>user._id!==currentUserId)
  },[users,currentUserId]);
  return otherusers;
}