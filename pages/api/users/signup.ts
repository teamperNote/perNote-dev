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
    const { username, email, name, password, phoneNumber, birth, gender } =
      req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser)
      return res.status(400).json({
        message: "이미 존재하는 유저입니다",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password: hashedPassword,
        phoneNumber,
        gender,
      },
    });
    const accessToken = jwt.sign({ userId: user.username }, secretKey, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user.username }, secretKey, {
      expiresIn: "14d",
    });
    return res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  }
}
