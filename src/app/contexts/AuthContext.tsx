"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  state: {
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
  };
  setState: React.Dispatch<React.SetStateAction<User["state"]>>;
};

export const nullUser: User["state"] = {
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

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};
