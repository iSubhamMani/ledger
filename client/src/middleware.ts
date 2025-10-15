import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ROUTES = ["/analytics", "/add"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  const isRootRoute = req.nextUrl.pathname === "/";

  // If route is protected and no token, redirect to "/"
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If token exists, verify it
  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
      // If valid token and user is on root route, redirect to "/add"
      if (isRootRoute) {
        return NextResponse.redirect(new URL("/add", req.url));
      }
      // Valid token, allow request
      return NextResponse.next();
    } catch {
      // Invalid token, redirect to "/"
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      // For non-protected routes, allow request
      return NextResponse.next();
    }
  }

  // For non-protected routes, allow request
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
}

// Optional: specify where to run middleware
export const config = {
  matcher: ["/", "/analytics", "/add"],
};
