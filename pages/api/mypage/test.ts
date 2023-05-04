import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const accessToken = req.headers.authorization.split("Bearer ")[1];

  const { payload } = await jwtVerify(accessToken, secretKey);
  const userId = payload.iss;

  const test = await prisma.test.findMany({
    where: { userId },
    select: {
      id: true,
      createdAt: true,
      perfumeIDs: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

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
  }

  return res.status(200).json(test);
}
