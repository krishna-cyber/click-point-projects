import { login } from "@/lib/actions/login";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useActionState } from "react";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectTo")?.toString();

  const initialState = {
    type: "",
    message: "",
  };
  const [state, formAction, isPending] = useActionState(login, initialState);

  if (state.type == "success") {
    window.location.href = redirect ?? "/";
  }
  return (
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form action={formAction} method="POST">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            className="text-blue-500"
          />
          <label htmlFor="remember" className="text-gray-600 ml-2">
            Remember Me
          </label>
        </div>
        <div className="mb-6 text-blue-500">
          <Link href="#" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
        >
          Login
        </button>
      </form>
      <div className="mt-6 text-blue-500 text-center">
        <Link href="/signup" className="hover:underline">
          Sign up Here
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
