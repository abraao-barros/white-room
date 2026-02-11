import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  // Protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      await decrypt(session);
    } catch {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Redirect to dashboard if logged in
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (session) {
      try {
        await decrypt(session);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch {
        // Continue to auth page
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
