import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const access_token = cookieStore.get("accessToken");
    const refresh_token = cookieStore.get("refreshToken");
    console.log(access_token, refresh_token);
    if (!access_token || !refresh_token) {
      return NextResponse.rewrite(new URL("/forbidden", request.url));
    }
  }
  NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
