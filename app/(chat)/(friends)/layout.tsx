import FriendsBar from "@/components/chat/shared/FriendsBar";

export default function FriendsLayout({children}:{children:any}) {
    return (
        <div className=" w-full h-full flex">
            <section className=" w-[25%] h-full bg-dark-3 ">
                <FriendsBar />
            </section>
            <section className=" w-[75%] h-full">
                {children}
            </section>
        </div>    
    )
}