import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(req: NextRequest) {
  const role = req.headers.get("authorization");
  if (!role) {
    return NextResponse.redirect(
      new URL("/api/middleware/unauthorized", req.url),
    );
  }

  const accessToken = role.split("Bearer ")[1];
  if (!accessToken) {
    return NextResponse.redirect(
      new URL("/api/middleware/unauthorized", req.url),
    );
  }

  try {
    await jwtVerify(accessToken, secretKey);
  } catch (e) {
    return NextResponse.redirect(
      new URL("/api/middleware/tokenExpired", req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/:path*"],
};
