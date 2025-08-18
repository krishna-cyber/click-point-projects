"use client";
import React, { createContext, useState, useContext } from "react";
import { UserDataType } from "../../types/types";

export type UserContextType = {
  user: UserDataType | null;
  saveUser: (user: UserDataType) => void;
  updateUser: (id: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDataType | null>(null);

  const saveUser = (newUser: UserDataType) => {
    setUser(newUser);
  };

  const updateUser = (id: string) => {
    console.log(`Updating user with id: ${id}`);
  };
  return React.createElement(
    UserContext.Provider,
    { value: { user, saveUser, updateUser } },
    children
  );
};

export default UserProvider;

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useUserContext must be used within <UserProvider>");
  return ctx;
};
