import { NextResponse } from "next/server";

export async function middleware(req) {
  const sessionCookie =
    req.cookies.get("better-auth.session_token");

  const pathname = req.nextUrl.pathname;

  // Protected Routes
  const protectedRoutes = [
    "/dashboard",
    "/buyer",
    "/seller",
    "/admin",
    "/profile",
    "/orders",
    "/wishlist",
  ];

  const isProtected = protectedRoutes.some(
    (route) => pathname.startsWith(route)
  );

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/buyer/:path*",
    "/seller/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/wishlist/:path*",
  ],
};