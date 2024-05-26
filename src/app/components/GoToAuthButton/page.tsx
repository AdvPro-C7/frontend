"use client";
import { useRouter } from "next/navigation";

const GoToAuthButton = () => {
  const router = useRouter();

  const redirect = () => {
    router.push("/auth");
  };

  return <button onClick={redirect}>Go to Authentication Page</button>;
};

export default GoToAuthButton;
