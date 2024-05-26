"use client";
import { useRouter } from "next/navigation";

const GoToAuthButton = () => {
  const router = useRouter();

  const redirect = () => {
    router.push("/auth");
  };

  return <button  className="bg-[#00a64c] text-white-100 rounded-lg py-4 px-4"  onClick={redirect}>Go To Authentication Page</button>;
};

export default GoToAuthButton;
