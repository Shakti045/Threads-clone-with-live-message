"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn,useAuth,UserButton} from "@clerk/nextjs";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { sidebarLinks } from "@/constants";
import { useDispatch } from "react-redux";


const LeftSidebar =  () => {
  const router = useRouter();

  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          if(link.route==="/profile"){
            link.route = `/profile/${userId}?myid=true`
          }
          const isActive =  link.route === `/profile/${userId}?myid=true`?(pathname===`/profile/${userId}` ):(pathname === link.route )           
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton signOutCallback={() => {
            router.push("/sign-in")
            // dispatch(setUser(null));
          }}>
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />

              <p className='text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
        <div className=" flex gap-2 items-center text-light-2 ml-2 mt-10 ">
        <UserButton afterSignOutUrl="/sign-in"/>
        <p>Manage Account</p>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;