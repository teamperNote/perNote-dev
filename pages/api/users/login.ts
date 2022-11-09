import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const secretKey = process.env.JWT_SECRET_KEY || "";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(200).json({
      message: "No Such User Found",
    });
  }

  const isPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isPassword) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const accessToken = jwt.sign({ userId: user.id }, secretKey, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ userId: user.id }, secretKey, {
    expiresIn: "14d",
  });

  return res.status(200).json({
    user,
    accessToken,
    refreshToken,
  });
}
