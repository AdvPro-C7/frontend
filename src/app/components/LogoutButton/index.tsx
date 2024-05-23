"use client";
import { useRouter } from "next/navigation";
import { userContext, nullUser } from "@/app/contexts/AuthContext";

const LogoutButton = () => {
  const router = useRouter();
  const { setState } = userContext();

  const logout = () => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

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
