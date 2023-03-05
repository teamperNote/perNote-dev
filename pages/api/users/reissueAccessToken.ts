import type { NextApiRequest, NextApiResponse } from "next";
import { EncryptJWT, jwtVerify } from "jose";
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
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const accessToken = await new EncryptJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
      .setIssuer(user.id)
      .setExpirationTime("1h")
      .encrypt(secretKey);

    return res.status(200).json(accessToken);
  }
}
