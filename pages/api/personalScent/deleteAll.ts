import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const test = await prisma.test.deleteMany({});

  return res.status(200).json({
    result: test,
  });
}
