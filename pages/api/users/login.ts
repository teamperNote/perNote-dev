import type { NextApiRequest, NextApiResponse } from "next";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(200).json({
        message: "존재하지 않는 사용자입니다",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "비밀번호가 틀렸습니다",
      });
    }

    const alg = "HS256";

    const accessToken = await new SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg })
      .setIssuer(user.email)
      .setExpirationTime("1s")
      .sign(secretKey);

    const refreshToken = await new SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg })
      .setIssuer(user.email)
      .setExpirationTime("14d")
      .sign(secretKey);

    return res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  }
}
