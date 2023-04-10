import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Initiate response data
  let resStatus, resData;

  // req.query에 전달된 값은 testId 에 따른 로직만 작동
  const id = req.query.testId as string;

  const test = await prisma.test.findMany({
    where: {
      id: id,
    },
    select: {
      chosen: true,
      perfumes: {
        select: {
          id: true,
          brand_eng: true,
          name_eng: true,
          imgUrl: true,
        },
      },
      createdAt: true,
      // perfumeIDs: true // For console
    },
  });
  if (!test) {
    resStatus = 400;
    resData = {
      message: "Error: personalScent/result",
    };
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

  resStatus = 200;
  resData = {
    testResult: result,
    // elem: testResultDB[0]
  };

  return res.status(resStatus).send(resData);
}
