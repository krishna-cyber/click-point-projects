"use client";
import React, { createContext, useState, useContext } from "react";

export interface Permission {
  name: string;
  action: string;
}

export interface Role {
  name: string;
  permissions: Permission[];
}

export interface User {
  _id?: string;
  name?: string;
  title?: string;
  description?: string;
  status?: boolean;
}

export type UserContextType = {
  user: User | null;
  saveUser: (user: User) => void;
  updateUser: (id: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const saveUser = (newUser: User) => {
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
