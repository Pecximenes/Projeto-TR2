import { NextResponse, type NextRequest } from "next/server";
import { getUrlByPath } from "./lib/getUrlByPath";
import { type Session } from "next-auth";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("next-auth.session-token");

  if (pathname.startsWith("/dashboard") && token) {
    const session = (await (
      await fetch(process.env.NEXTAUTH_URL + "/api/auth/session", {
        headers: {
          Cookie: `${token.name}=${token.value}`,
        },
      })
    ).json()) as Session;

    return session?.user?.id
      ? NextResponse.next()
      : NextResponse.redirect(getUrlByPath("/"));
  }

  if (pathname === "/" && token) {
    const session = (await (
      await fetch(process.env.NEXTAUTH_URL + "/api/auth/session", {
        method: "GET",
        headers: {
          Cookie: `${token.name}=${token.value}`,
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
