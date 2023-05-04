import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const accessToken = req.headers.authorization.split("Bearer ")[1];

  const { payload } = await jwtVerify(accessToken, secretKey);
  const userId = payload.iss;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return res.status(200).json(user);
}
