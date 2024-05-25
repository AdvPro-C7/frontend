"use client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/auth");
  };

  return (
    <button id="logout-btn" onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
