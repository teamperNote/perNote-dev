import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, phoneNumber } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
      phoneNumber,
    },
  });

  return res.status(200).json(user);
}
