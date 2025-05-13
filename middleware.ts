import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  // Protect routes that require authentication
  if (request.nextUrl.pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(
      new URL("/login?callbackUrl=" + encodeURIComponent(request.nextUrl.pathname), request.url),
    )
  }

  if (request.nextUrl.pathname.startsWith("/saved") && !token) {
    return NextResponse.redirect(
      new URL("/login?callbackUrl=" + encodeURIComponent(request.nextUrl.pathname), request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/saved/:path*"],
}
