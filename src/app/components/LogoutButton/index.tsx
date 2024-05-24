"use client";
import { useRouter } from "next/navigation";
import { userContext, nullUser } from "@/app/contexts/AuthContext";

const LogoutButton = () => {
  const router = useRouter();
  const { setState } = userContext();

  const logout = () => {
    setState(nullUser);

    router.push("/auth");
  };

  return (
    <button id="logout-btn" onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
