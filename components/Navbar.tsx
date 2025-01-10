import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href={"/"} className='flex items-center gap-1'>
        <Image
          src={"/icons/logo.svg"}
          alt='Logo'
          width={32}
          height={32}
        ></Image>
        <p className='text-2xl text-white max-sm:hidden'>MeetMatrix</p>
      </Link>
      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
