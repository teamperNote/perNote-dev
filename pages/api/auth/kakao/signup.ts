import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { name, email, password, phoneNumber, birth, gender, userId } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });
    // 1. 기존에 가입한 정보가 있는 경우
    if (user) {
      const updatedUser = await prisma.user.update({
        where: { phoneNumber },
        data: {
          name,
          email,
          password: hashedPassword,
          phoneNumber,
          birth,
          gender,
          snsId: userId,
          snsType: "kakao",
        },
      });

      return res.status(200).json(updatedUser);
    }
    // 2. 기존에 가입된 정보가 없는 경우
    else {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phoneNumber,
          birth,
          gender,
          snsId: userId,
          snsType: "kakao",
        },
      });

      return res.status(200).json(user);
    }
  }
}
