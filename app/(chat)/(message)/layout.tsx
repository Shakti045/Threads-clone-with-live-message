import ChatBar from "@/components/chat/shared/ChatBar"
import { Toaster } from "react-hot-toast"
export default function Conversationlayout({children}:{children:any}) {
    return (
        <div className=" w-full h-full  flex">
            <section className=" max-sm:hidden w-[25%] h-full bg-dark-3 border-r-[1px] border-slate-50   ">
                <ChatBar />
            </section>
            <section className=" max-sm:w-[100%] w-[75%] h-full">
                {children}
                <Toaster  position="bottom-right"
                          reverseOrder={false}/>
            </section>
        </div>    
    )
}
