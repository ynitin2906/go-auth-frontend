import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect to the login page if the user is on the home page ('/')
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to pass through if no conditions match
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Make sure it targets the root
};
