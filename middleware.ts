import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(req: NextRequest) {
  const role = req.headers.get("Authorization");
  if (!role) {
    return NextResponse.redirect(
      new URL("/api/middleware/unauthorized", req.url),
    );
  }

  const accessToken = role.split("Bearer ")[1];
  console.log(accessToken);

  try {
    const { payload } = await jwtVerify(accessToken, secretKey);
    console.log(payload.iss);
  } catch (error) {
    return NextResponse.redirect(
      new URL("/api/middleware/tokenExpired", req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/checkEmail"],
};
