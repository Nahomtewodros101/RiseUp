import { type NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Check if the path starts with /console
  if (request.nextUrl.pathname.startsWith("/console")) {
    const token = request.cookies.get("auth-token")?.value;

    // If no token exists, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verify the token
      const user = await verifyJwtToken(token);

      // If token is invalid or user is not admin, redirect to login
      if (!user || user.role !== "admin") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      // If token verification fails, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: ["/console/:path*"],
};
