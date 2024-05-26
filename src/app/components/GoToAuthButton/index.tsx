"use client";
import { useRouter } from "next/navigation";

const GoToAuthButton = () => {
  const router = useRouter();

  const redirect = () => {
    router.push("/auth");
  };

  return <button onClick={redirect}>Go To Authentication Page</button>;
};

export default GoToAuthButton;
