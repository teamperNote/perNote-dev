import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, phoneNumber } = req.body;

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
}
