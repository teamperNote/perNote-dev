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
  if (req.method === "POST") {
    const { name, email, phoneNumber } = req.body;

    const password = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        phoneNumber,
      },
    });
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
}
