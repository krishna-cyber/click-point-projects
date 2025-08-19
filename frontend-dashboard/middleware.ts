import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const access_token = cookieStore.get("accessToken")?.value;
  const refresh_token = cookieStore.get("refreshToken")?.value;
  if (!access_token && !refresh_token) {
    return NextResponse.rewrite(new URL("/forbidden", request.url));
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
