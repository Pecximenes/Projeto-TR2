import { NextResponse, type NextRequest } from "next/server";
import { getUrlByPath } from "./lib/getUrlByPath";
import { type Session } from "next-auth";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    const session = (await (
      await fetch(process.env.NEXTAUTH_URL + "/api/auth/session", {
        method: "GET",
        headers: {
          ...Object.fromEntries(request.headers),
        },
      })
    ).json()) as Session;

    return session?.user?.id
      ? NextResponse.next()
      : NextResponse.redirect(getUrlByPath("/"));
  }

  if (pathname === "/") {
    const session = (await (
      await fetch(process.env.NEXTAUTH_URL + "/api/auth/session", {
        method: "GET",
        headers: {
          ...Object.fromEntries(request.headers),
        },
      })
    ).json()) as Session;

    return session?.user?.id
      ? NextResponse.redirect(getUrlByPath("/dashboard"))
      : NextResponse.next();
  }

  return NextResponse.redirect(getUrlByPath("/not-found"));
}

export const config = {
  matcher: ["/dashboard/:path?", "/"],
};
