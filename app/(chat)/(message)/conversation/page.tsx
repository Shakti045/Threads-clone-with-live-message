import ChatBar from "@/components/chat/shared/ChatBar";
import LeftSidebar from "@/components/chat/shared/LeftSidebar";

const Conversation = async() => {
  return (
    <div className="  bg-dark-1  w-full h-full text-white flex justify-center items-center">
     <section className=" max-sm:hidden">
         <img
          src="https://i.pinimg.com/736x/f5/48/d9/f548d95a9c7cae6a0789e7a28f9c8547.jpg"
          className=" h-[500px]"
         >
         </img>
      
     </section>
     <section className=" flex flex-col w-full h-full lg:hidden md:hidden ">
      <div className=" w-full h-[calc(100vh-3rem)]">
      <ChatBar/>
      </div>
      <div className=" px-3 w-full h-12">
        <LeftSidebar/>
      </div>
     </section>
    </div>
  )
}

export default Conversation;