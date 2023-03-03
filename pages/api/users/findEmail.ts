import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const phoneNumber = req.query.phoneNumber as string;

  const user = await prisma.user.findUnique({
    where: { phoneNumber },
  });

  if (!user) {
    return res.status(400).json({
      message: "해당 유저가 존재하지 않습니다",
    });
  }

  const { email } = user;
  return res.status(200).json({ email });
}
