import type { NextApiRequest, NextApiResponse } from "next";
import { SignJWT, jwtVerify } from "jose";

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
        message: "RefreshToken Expired",
      });
    }
    const alg = "HS256";

    const accessToken = await new SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg })
      .setIssuer(email)
      .setExpirationTime("1h")
      .sign(secretKey);

    return res.status(200).json(accessToken);
  }
}
