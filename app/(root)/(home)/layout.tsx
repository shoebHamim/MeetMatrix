import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='relative'>
      navbar
      <div className='flex'>
        sidebar
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
          <div className='w-full'>{children}</div>
        </section>
      </div>
      Footer
    </main>
  );
};

export default HomeLayout;
