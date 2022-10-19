// 비밀번호 재설정

// 유저가 이메일 입력(유저 존재 여부 검증) -> 전화번호or이메일 인증 -> 새 비밀번호 입력
// 맨 처음에 유저가 입력한 이메일을 프론트단에서 계속 가지고 있나? 그러면 req.body에서 email을 꺼내올 수 있음

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrpyt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  const newPassword = await bcrpyt.hash(req.body.newPassword, 10);

  // update문 없이 바로 user에 newPassword 넣는 방식도 가능?
  // user.password = newPassword;
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { password: newPassword },
  });

  return res.status(200).json(updatedUser);
}
