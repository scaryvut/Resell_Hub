import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(request) {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(request.headers),
    });

    if (!session) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    const role =
      session.user.role?.toLowerCase();

    const pathname =
      request.nextUrl.pathname;

    if (
      pathname.startsWith("/admin") &&
      role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    if (
      pathname.startsWith("/seller") &&
      role !== "seller"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    if (
      pathname.startsWith("/buyer") &&
      role !== "buyer"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/seller/:path*",
    "/buyer/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/wishlist/:path*",
    "/orders/:path*",
  ],
};