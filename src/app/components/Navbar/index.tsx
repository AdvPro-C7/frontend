"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoPersonCircleOutline, IoBagHandleOutline } from "react-icons/io5";
import LogoutButton from "../LogoutButton";
import { userContext } from "@/app/contexts/AuthContext";

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
  const router = useRouter();
  const { state } = userContext();

  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false); // Track authentication status

  useEffect(() => {
    // Check authentication status
    setAuthenticated(state.authenticated);
    setIsLoaded(true);
  }, [state.authenticated]);

  const handleCartClick = () => {
    // Redirect to cart if authenticated, otherwise do nothing (disabled state)
    if (authenticated) {
      router.push(`/cart/${state.id}`); // Assuming state.userId is available
    }
    // You can optionally handle what happens if the user is not authenticated
  };

  return (
    <nav className="fixed z-40 w-full bg-primary shadow-md">
      <div className="flex justify-between items-center mx-12 py-2 md:mx-24">
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
          <IoBagHandleOutline
            className={`text-blue-100 text-3xl md:text-4xl cursor-pointer ${
              authenticated ? "hover:text-blue-300" : "opacity-50 pointer-events-none"
            }`}
            onClick={handleCartClick}
          />
          {state.authenticated && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
