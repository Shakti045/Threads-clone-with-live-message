import FriendsBar from "@/components/chat/shared/FriendsBar";

export default function FriendsLayout({children}:{children:any}) {
    return (
        <div className=" w-full h-full flex">
            <section className=" max-sm:hidden w-[25%] h-full bg-dark-3 ">
                <FriendsBar />
            </section>
            <section className=" max-sm:w-[100%]    w-[75%] h-full">
                {children}
            </section>
        </div>    
    )
}