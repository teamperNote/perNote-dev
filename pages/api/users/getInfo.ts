import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const role = req.headers.authorization;

  const accessToken = role.split("Bearer ")[1];
  const { payload } = await jwtVerify(accessToken, secretKey);

  const user = await prisma.user.findUnique({
    where: { id: payload.iss },
  });

  return res.status(200).json(user);
}
