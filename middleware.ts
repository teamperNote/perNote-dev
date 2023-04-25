import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(req: NextRequest) {
  const role = req.headers.get("Authorization");

  if (role) {
    const accessToken = role.split("Bearer ")[1];

    try {
      await jwtVerify(accessToken, secretKey);
    } catch (error) {
      return NextResponse.redirect(
        new URL("/api/middleware/tokenExpired", req.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
