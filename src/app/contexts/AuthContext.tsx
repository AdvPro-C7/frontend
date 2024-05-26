"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  state: {
    id: number | null;
    name: string;
    sex: "" | "male" | "female";
    photoLink: string;
    email: string;
    phoneNum: string;
    birthDate: string;
    bio: string;
    warningCount: number;
    authenticated: boolean;
    role: "customer" | "admin";
    totalCartItems: number;
  };
  setState: React.Dispatch<React.SetStateAction<User["state"]>>;
};

export const nullUser: User["state"] = {
  id: null,
  name: "",
  sex: "",
  photoLink: "",
  email: "",
  phoneNum: "",
  birthDate: "",
  bio: "",
  warningCount: 0,
  authenticated: false,
  role: "customer",
  totalCartItems:0,
};

const UserContext = createContext<User>({
  state: nullUser,
  setState: () => {},
});

export const userContext = () => useContext(UserContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<User["state"]>(nullUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userState = localStorage.getItem("userState") || "{}";
    setState(JSON.parse(userState));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            border: "16px solid #f3f3f3",
            borderRadius: "50%",
            borderTop: "16px solid navy",
            width: "120px",
            height: "120px",
            animation: "spin 2s linear infinite",
          }}
        />
        <style jsx global>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};
