import type { NextApiRequest, NextApiResponse } from "next";
import { SignJWT, jwtVerify } from "jose";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, refreshToken } = req.body;

    try {
      await jwtVerify(refreshToken, secretKey);

      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return res.status(400).json({
          message: "존재하지 않는 사용자입니다",
        });
      }
      const accessToken = await new SignJWT({ "urn:example:claim": true })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuer(user.id)
        .setExpirationTime("1h")
        .sign(secretKey);

      return res.status(200).json({ accessToken });
    } catch (error) {
      // refreshToken 만료
      if (error.code === "ERR_JWT_EXPIRED") {
        return res.status(400).json({
          message: "RefreshToken expired",
        });
      } else {
        return res.status(400).json({
          message: "Not a valid refreshToken",
        });
      }
    }
  }
}
