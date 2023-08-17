import GroupCreationForm from "@/components/chat/shared/GroupCreationForm";
import { getallusers } from "@/libs/actions/chat.actions";
const Groupcreation = async() => {
    const users=await getallusers();
  return (
    <div className=" max-sm:p-0  h-full flex flex-col gap-4 w-full p-5 text-white">
    <h1 className=" text-bold text-[25px]">CREATE GROUP</h1>
      <div className=" w-full h-full flex justify-center items-center">
      <GroupCreationForm users={users} />
      </div>
    </div>
  )
}

export default Groupcreation