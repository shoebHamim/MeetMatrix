"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className='w-full max-w-[264]'>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/icons/hamburger.svg"}
            alt='hamburger icon'
            width={36}
            height={36}
            className='cursor-pointer sm:hidden'
          ></Image>
        </SheetTrigger>
        <SheetContent side={"left"} className='border-none bg-dark-1'>
        <SheetTitle></SheetTitle>
          <Link href={"/"} className='flex items-center gap-1'>
            <Image
              src={"/icons/logo.svg"}
              alt='Logo'
              width={32}
              height={32}
            ></Image>
            <p className='text-2xl text-white '>MeetMatrix</p>
          </Link>
          <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
            <SheetClose asChild>
              <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname !== "/"
                      ? pathname === link.route
                      : pathname === link.route ||
                        pathname.startsWith(link.route);
                  return (
                    <SheetClose key={link.route} asChild>
                    <Link
                      href={link.route}
                      key={link.label}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                        { "bg-blue-1": isActive }
                      )}
                    >
                      <Image
                        src={link.imgUrl}
                        alt={link.label}
                        width={20}
                        height={20}
                      ></Image>
                      <p className='text-lg font-semibold '>
                        {link.label}
                      </p>
                    </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
