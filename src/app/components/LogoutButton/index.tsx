"use client";
import { useRouter } from "next/navigation";
import { userContext, nullUser } from "@/app/contexts/AuthContext";

const LogoutButton = () => {
  const router = useRouter();
  const { setState } = userContext();

  const logout = () => {
    setState(nullUser);
    localStorage.removeItem("userState");
    router.push("/auth");
  };

  return (
    <button className="bg-[#00a64c] text-white-100 rounded-lg py-4 px-4" id="logout-btn" onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
