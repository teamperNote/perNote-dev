import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = req.query;

  let whichId, id;
  if (query.userId) {
    whichId = "userId";
    id = query.userId;
  } else if (query.testId) {
    whichId = "id";
    id = query.testId;
  } else {
    await prisma.$disconnect();

    return res.status(400).json({
      message: "Error: query doesn't have correct property.",
    });
  }

  const test = await prisma.test.findMany({
    where: {
      [whichId]: id,
    },
    select: {
      chosen: true,
      perfumes: true,
      createdAt: true,
      // perfumeIDs: true // For console
    },
  });
  if (!test) {
    await prisma.$disconnect();

    return res.status(200).json({
      message: "Error: personalScent/result",
    });
  }

  await prisma.$disconnect();

  return res.status(200).json({
    perfumes: test,
    // elem: testResultDB[0]
  });
}
