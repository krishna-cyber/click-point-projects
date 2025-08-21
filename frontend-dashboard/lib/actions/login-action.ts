"use server";
import * as cookie from "cookie";
import { cookies } from "next/headers";
import axios from "axios";
import { api } from "../http/api";

interface PreviousState {
  // Define the structure of previousState here
  [key: string]: unknown;
}

export async function login(previousState: PreviousState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      type: "error",
      message: "Email and passwords are required",
    };
  }

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const setCookieHeaders = response.headers["set-cookie"];

    if (!setCookieHeaders) {
      return {
        type: "error",
        message: "No cookies are found",
      };
    }

    const accessToken = setCookieHeaders.find((cookie) =>
      cookie.includes("accessToken")
    );
    const refreshToken = setCookieHeaders.find((cookie) =>
      cookie.includes("refreshToken")
    );

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "No cookies are found",
      };
    }

    const parsedAccessToken = cookie.parse(accessToken);
    const parsedRefreshToken = cookie.parse(refreshToken);

    (await cookies()).set({
      name: "accessToken",
      value: parsedAccessToken.accessToken as string,
      expires: new Date(parsedAccessToken.Expires as string),
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Path,
      sameSite: parsedAccessToken.Samesite as "strict",
      domain: parsedAccessToken.Domain,
    });
    (await cookies()).set({
      name: "refreshToken",
      value: parsedRefreshToken.refreshToken as string,
      expires: new Date(parsedRefreshToken.Expires as string),
      httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
      path: parsedRefreshToken.Path,
      sameSite: parsedRefreshToken.Samesite as "strict",
      domain: parsedRefreshToken.Domain,
    });

    return {
      type: "success",
      message: "login successful",
      user: response.data?.user,
    };
  } catch (error: unknown) {
    console.log(error);

    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data;
        return {
          type: "error",
          message:
            errorData?.errors?.[0]?.message ||
            errorData?.message ||
            "Login failed",
        };
      } else if (error.request) {
        // Request was made but no response received
        return {
          type: "error",
          message: "Network error - please check your connection",
        };
      }
    }

    return {
      type: "error",
      message: (error as Error)?.message || "An unknown error occurred",
    };
  }
}
