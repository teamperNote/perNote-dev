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
        id: true,
        createdAt: true,
        perfumeIDs: true,
      },
    });

    if (!test) {
      resStatus = 200;
      resData = { message: "Error: personalScent/result" };
    } else {
      for (let i = 0; i < test.length; i++) {
        const top1 = await prisma.perfume.findMany({
          where: {
            id: test[i].perfumeIDs[0],
          },
          select: {
            name_eng: true,
            brand_eng: true,
            top: true,
            middle: true,
            bottom: true,
            imgUrl: true,
          },
        });

        const perfumeNote = await prisma.perfume_CategoryInfo.findMany({
          where: {
            name_eng: top1[0].name_eng,
          },
          select: {
            note: true,
          },
        });

        test[i]["note"] = perfumeNote[0].note;

        for (const [key, val] of Object.entries(top1[0])) {
          test[i][key] = val;
        }

        delete test[i].perfumeIDs;
      }

      resStatus = 200;
      resData = test;
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
