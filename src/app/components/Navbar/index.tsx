"use client";
import Image from "next/image";
import LogoutButton from "../LogoutButton";
import React from "react";
import { IoPersonCircleOutline, IoBagHandleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import GoToAuthButton from "../GoToAuthButton/page";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <a
      className={`transition-opacity px-3 py-1 rounded-full ${
        isActive
          ? "active underline font-bold bg-red-primary hover:opacity-70"
          : "hover:text-red-primary"
      } `}
      href={href}
    >
      {children}
    </a>
  );
}

const Navbar = () => {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <nav className="fixed z-40 w-full bg-primary shadow-md">
      <div className="flex justify-between items-center mx-12 py-4 md:mx-24">
        <div className="flex items-center">
          <NavLink href="/" isActive={pathname === "/"}>
            <Image
              src={"/bookid.jpg"}
              alt="logo"
              className="cursor-pointer hover:opacity-100 border-none"
              width={220}
              height={80}
            />
          </NavLink>
        </div>
        <div className="flex gap-4 md:gap-14 text-center items-center">
          <IoPersonCircleOutline className="text-blue-100 text-3xl md:text-4xl cursor-pointer hover:text-blue-300" />
          <IoBagHandleOutline className="text-blue-100 text-3xl md:text-4xl cursor-pointer hover:text-blue-300" />
          {localStorage.getItem("authenticated") == null ? (
            <GoToAuthButton />
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
