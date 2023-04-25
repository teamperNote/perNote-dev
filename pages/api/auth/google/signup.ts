import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { name, phoneNumber, birth, gender, userId } = req.body;

    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });
    // 1. 기존에 가입한 정보가 있는 경우 -> 로컬 계정과 연동
    if (user) {
      const updatedUser = await prisma.user.update({
        where: { phoneNumber },
        data: {
          snsId: userId,
          snsType: "google",
        },
      });

      return res.status(200).json(updatedUser);
    }
    // 2. 기존에 가입된 정보가 없는 경우 - 이메일, 비밀번호는 임의의 unique값으로 저장해둠
    else {
      const user = await prisma.user.create({
        data: {
          name,
          email: userId,
          password: userId,
          phoneNumber,
          birth,
          gender,
          snsId: userId,
          snsType: "google",
        },
      });

      return res.status(200).json(user);
    }
  }
}
