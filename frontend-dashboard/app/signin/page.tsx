import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";
import LoginForm from "./components/loginForm";

const LoginPage = () => {
  // Simulate checking if user is already logged in
  const isAuthenticated = false; // Replace with real auth check

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <Image
          width={100}
          height={100}
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
