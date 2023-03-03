// 이메일 존재(중복)여부 검증

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const email = req.query.email as string;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return res.status(400).json({
      message: "이미 사용중인 이메일입니다",
    });
  } else {
    return res.status(200).json({
      message: "사용가능한 이메일입니다",
    });
  }
}
