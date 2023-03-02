import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const test = await prisma.test.deleteMany({});

  await prisma.$disconnect();

  return res.status(200).json({
    result: test,
  });
}
