import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ROUTES = ["/dashboard", "/add"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  // if the route is not protected, allow it
  if (!PROTECTED_ROUTES.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // if no token → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // verify token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    console.log("Payload:", payload);
    // token valid → allow request
    return NextResponse.next();
  } catch {
    // token invalid or expired
    const res = NextResponse.redirect(new URL("/", req.url));
    return res;
  }
}

// Optional: specify where to run middleware
export const config = {
  matcher: ["/dashboard", "/add"],
};
