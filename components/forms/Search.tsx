'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
const Searchbar = ({searchuser}:{searchuser?:any}) => {
  const {register,handleSubmit,formState:{errors},reset}:any = useForm();
  const router = useRouter();
  const pathname=usePathname();
  function searchhandler(data:any){
    router.push(`${pathname}?keyword=${data.search}`)
    reset({
      search:""
    });
  }
  return (
    <>

     <form onSubmit={handleSubmit(searchhandler)} className=' w-full flex gap-2'>
        <input spellCheck={false} type="text" className=' w-full  bg-dark-4 outline-none text-light-1 p-2 rounded-md' placeholder="Search for users"
        {
            ...register("search",{required:{value:true,message:"Please enter something to search"}})
        }
         />
          <button className='  bg-purple-600 text-white rounded-md p-2  py-1' type="submit">Search</button>
     </form>
     {
          errors.search && (
              <p className=' text-red-600'>{errors.search.message}</p>
          )
     }
    </>
  )
}

export default Searchbar