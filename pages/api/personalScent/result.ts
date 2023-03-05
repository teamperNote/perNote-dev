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
      perfumes: {
        select: {
          id: true,
          imgUrl: true,
          brand_eng: true,
          name_eng: true,
        },
      },
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

  const result = {};
  result["chosen"] = {
    gender: test[0].chosen[0],
    concentration: test[0].chosen[1],
    season: test[0].chosen[2],
    color: test[0].chosen[3],
    personality: test[0].chosen[4],
    feature: test[0].chosen[5],
  };
  result["perfumes"] = test[0].perfumes;

  await prisma.$disconnect();

  return res.status(200).json({
    testResult: test[0],
    // elem: testResultDB[0]
  });
}
