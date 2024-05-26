"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoPersonCircleOutline, IoBagHandleOutline } from "react-icons/io5";
import LogoutButton from "../LogoutButton";
import { userContext } from "@/app/contexts/AuthContext";
import GoToAuthButton from "../GoToAuthButton";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <a
      className={`transition-opacity px-3 py-1 rounded-full ${isActive
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
  const { state, setState } = userContext();
  const pathname = usePathname();
  const [totalCartItems, setTotalCartItems] = useState(0);
  const userId = state.id;

  const handleCartClick = () => {
    if (state.authenticated) {
      if (userId) {
        router.push(`/cart/${userId}`);
      }
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch('https://functionality-hkqa74sxta-ew.a.run.app/api/customer/userCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setTotalCartItems(data.cartItems.length);
        setState(prevState => ({
          ...prevState,
          totalCartItems: data.cartItems.length,
        }));
      } else if (response.status === 404) {
        await fetch('https://functionality-hkqa74sxta-ew.a.run.app/api/customer/createCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
      }
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  useEffect(() => {
    if (state.authenticated) {
      fetchCartItems();
    }
  }, [state.authenticated]);

  useEffect(() => {
    setTotalCartItems(state.totalCartItems);
  }, [state.totalCartItems]);

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
          {state.authenticated && (
            <>
              <NavLink href={`/history/${userId}`} isActive={pathname === `/history/${userId}`}>
                Pesanan Saya
              </NavLink>
              <NavLink href={`/transaction/${userId}`} isActive={pathname === `/transaction/${userId}`}>
                Belum Bayar
              </NavLink>
            </>
          )}
          <IoPersonCircleOutline
            className="text-blue-100 text-3xl md:text-4xl cursor-pointer hover:text-blue-300"
            onClick={() => router.push("/user-profile")}
          />
          <div className="relative">
            <IoBagHandleOutline
              className={`text-blue-100 text-3xl md:text-4xl cursor-pointer hover:text-blue-300 ${state.authenticated ? "" : "opacity-50 pointer-events-none"}`}
              onClick={handleCartClick}
            />
            {state.authenticated && totalCartItems >= 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white-100 rounded-full w-6 h-5 flex items-center justify-center text-xs">
                {totalCartItems}
              </span>
            )}
          </div>
          {state.authenticated ? <LogoutButton /> : <GoToAuthButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
