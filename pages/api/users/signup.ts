import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { name, email, password, phoneNumber, birth, gender } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber },
    });
    if (existingUser)
      return res.status(400).json({
        message: "이미 가입된 사용자입니다",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        birth,
        gender,
        snsId: email,
      },
    });

    return res.status(200).json(user);
  }
}
