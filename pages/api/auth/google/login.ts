import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const secretKey = process.env.JWT_SECRET_KEY || "";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { access_token } = req.body;

    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
    );

    const user = await prisma.user.findUnique({
      where: { snsId: data.id },
    });
    if (!user) {
      return res.status(200).json({
        message: "가입되지 않은 사용자입니다",
        userId: data.id,
      });
    }

    const accessToken = jwt.sign({ userId: user.snsId }, secretKey, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user.snsId }, secretKey, {
      expiresIn: "14d",
    });

    res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  }
}
