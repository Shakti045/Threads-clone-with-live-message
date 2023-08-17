import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });
import LeftSidebar from "@/components/chat/shared/LeftSidebar";
import ActiveStatus from "@/components/shared/ActiveStatus";
export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
    <html lang='en'>
    <body className={`${inter.className} h-[100vh] w-[100vw] flex`}>
     <main className=" w-full flex">
      <section className=" max-sm:hidden  w-[5%] bg-dark-2">
      {/* @ts-ignore expected an error */}
      <LeftSidebar />
      </section>
      <section className=" max-sm:w-[100%] bg-dark-1 w-[95%] ">
      {children}
      <ActiveStatus/>
      </section>
     </main>
    </body>
    </html>
    </ClerkProvider>
  );
}