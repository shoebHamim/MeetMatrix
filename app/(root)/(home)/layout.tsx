import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='relative  '>
      <Navbar/>
      <div className='flex '>
        <Sidebar></Sidebar>
        <section className=' min-h-screen flex flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
          <div className='w-full'>{children}</div>
        </section>
      </div>
      {/* <div>Footer</div> */}
    </main>
  );
};

export default HomeLayout;
