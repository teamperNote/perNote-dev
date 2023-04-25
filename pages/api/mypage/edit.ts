import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import bcrypt from "bcrypt";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, name, newPassword, birth } = req.body;
  const role = req.headers.authorization;

  const accessToken = role.split("Bearer ")[1];
  const { payload } = await jwtVerify(accessToken, secretKey);

  const userId = payload.iss;

  let updateUser: any;
  // 1. 비밀번호 변경x
  if (newPassword === "") {
    updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        name,
        birth,
      },
    });
  }
  // 2. 비밀번호 변경o
  else {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        name,
        password: hashedPassword,
        birth,
      },
    });
  }

  return res.status(200).json(updateUser);
}
