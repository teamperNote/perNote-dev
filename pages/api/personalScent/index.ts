import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  /*
    ==Pseudo Code==
    1. perfumeDB에서 유저가 선택한 sex에 해당하는 향수만 가져오기.
        * 쿼리를 작성하지 않고 바로 데이터를 불러오는 이유는 scoring을 위해서임.
    2. 선택된 algorithm 요소에 따라 algoIndex를 생성.
    3. 선택된 concentration에 따라 concenIndex를 생성.
    4. algoIndex, concenIndex를 참조하여 scoring.
    5. 내림차순으로 정렬한 후 top 5 추출. 
    */

  const query = req.query; // 유저가 선택한 쿼리들. ex) 봄, 깊은 등
  const userId = query.userId as string;
  let userGender = query.gender as string;
  const userSeason = query.season as string;
  const userColor = query.color as string;
  const userPersonal = query.personality as string;
  const userFeature = query.feature as string;
  const userConcen = query.concentration as string;

  // // 1. sex에 대한 1차 query.
  if (userGender === "mUni") userGender = "m, uni";
  else if (userGender === "fUni") userGender = "f, uni";

  const genderDB = await prisma.gender.findMany({
    where: {
      gender: {
        equals: userGender,
      },
    },
  });
  if (!genderDB) {
    return res.status(200).json({
      message: "Error: sexDB invokes",
    });
  }
  // ! 중복선택 db search 프론트랑 데이터형식 얘기해서 이어서 하기.

  // 2. algorithm에 대한 2차 query. (해당하지 않는 데이터값 제외)
  const algoDB = await prisma.algorithm.findMany({
    where: {
      AND: [
        {
          [userSeason]: {
            not: -1,
          },
        },
        {
          [userColor]: {
            not: -1,
          },
        },
        {
          [userPersonal]: {
            not: -1,
          },
        },
        {
          [userFeature]: {
            not: -1,
          },
        },
      ],
    },
  });
  if (!algoDB) {
    return res.status(200).json({
      message: "Error: algoDB invokes",
    });
  }
  // 3. concentration에 대한 3차 query.
  const concenDB = await prisma.concentration.findMany();
  if (!concenDB) {
    return res.status(200).json({
      message: "Error: concenDB invokes",
    });
  }

  // 4. 데이터 read & scoring.
  const perfumes = await prisma.perfume.findMany({
    where: {
      AND: [
        {
          gender: {
            contains: userGender,
          },
        },
      ],
    },
  });
  if (!perfumes) {
    return res.status(200).json({
      message: "No such perfume found",
    });
  }

  function updateAlgoScore(algo: any) {
    let sum = 0;
    sum += algo[userSeason];
    sum += algo[userColor];
    sum += algo[userPersonal];
    sum += algo[userFeature];
    return sum;
  }

  for (const perfume of perfumes) {
    // Scoring 1 - sex
    if (perfume.gender === userGender) perfume.score++;

    // Scoring 2 - concentration
    for (const concen of concenDB) {
      if (perfume.concentration === concen.concentration)
        perfume.score += concen[userConcen];
    }

    // Scoring 3 - algorithm
    for (const algo of algoDB) {
      if (perfume.first === algo.scent) {
        perfume.score += updateAlgoScore(algo);
      } else if (perfume.second == algo.scent) {
        perfume.score += updateAlgoScore(algo);
      } else if (perfume.third == algo.scent) {
        perfume.score += updateAlgoScore(algo);
      } else if (perfume.fourth == algo.scent) {
        perfume.score += updateAlgoScore(algo);
      } else if (perfume.fifth == algo.scent) {
        perfume.score += updateAlgoScore(algo);
      }
    }
  }

  let top5 = [];

  for (const perfume of perfumes) {
    if (top5.length < 5) top5.push(perfume);
    else {
      for (let i = 0; i < 5; i++) {
        if (top5[i].score < perfume.score) {
          top5[i] = perfume;
          break;
        }
      }
    }
  }

  top5 = top5.sort((a, b) => b.score - a.score);
  const perfumeIDs = [];
  for (const perfume of top5) {
    perfumeIDs.push({ id: perfume.id });
  }

  // CREATE CHOSEN COLUMN
  const chosen = [
    userGender,
    userSeason,
    userColor,
    userPersonal,
    userFeature,
    userConcen,
  ];
  // CREATE TEST DATA
  const test = await prisma.test.create({
    data: {
      userId: userId,
      chosen: chosen,
      perfumes: {
        connect: perfumeIDs,
      },
    },
  });

  await prisma.$disconnect();

  // Test Result to test.tsx
  return res.status(200).json({
    testId: test.id,
  });
}
