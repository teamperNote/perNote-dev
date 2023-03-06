import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = req.query;
  let id;
  let test;

  // Initiate response data
  let resStatus, resData;

  // req.query에 전달된 값이 userId 또는 testId 인지에 따라 다른 로직 작동.

  // userId: 해당 유저가 실행한 모든 personalScent 결과 return.
  if (query.userId) {
    id = query.userId;

    test = await prisma.test.findMany({
      where: {
        userId: id,
      },
      select: {
        perfumeIDs: true,
        createdAt: true,
        // perfumeIDs: true // For console
      },
    });

    if (!test) {
      resStatus = 200;
      resData = { message: "Error: personalScent/result" };
    } else {
      const perfumeIdDict = {};

      test.forEach((row) => {
        row.perfumeIDs.forEach((perfumeId) => {
          if (!perfumeIdDict[perfumeId])
            perfumeIdDict[perfumeId] = row.createdAt;
        });
      });

      const findOrCondition = [];
      Object.keys(perfumeIdDict).forEach((key) => {
        findOrCondition.push({
          id: key,
        });
      });

      const perfumes = await prisma.perfume.findMany({
        where: {
          OR: findOrCondition,
        },
        select: {
          id: true,
          name_eng: true,
          brand_eng: true,
          top: true,
          middle: true,
          bottom: true,
        },
      });
      for (let i = 0; i < perfumes.length; i++) {
        perfumes[i]["testCreatedAt"] = perfumeIdDict[perfumes[i].id];
      }

      resStatus = 200;
      resData = { perfumes };
    }

    // testId: 방금 진행한 personalScent 결과를 return.
  } else if (query.testId) {
    id = query.testId;

    test = await prisma.test.findMany({
      where: {
        id: id,
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
  } else {
    resStatus = 400;
    resData = {
      message: "Error: query doesn't have correct property.",
    };
  }

  await prisma.$disconnect();

  return res.status(resStatus).send(resData);
}
