import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const role = req.headers.authorization;

  const accessToken = role.split("Bearer ")[1];
  const { payload } = await jwtVerify(accessToken, secretKey);

  const userId = payload.iss;

  const perfumeLiked = await prisma.perfumeLike.findMany({
    where: { userId },
    select: { perfumeId: true },
  });

  const findManyOrCondition = [];
  perfumeLiked.forEach((data) => {
    findManyOrCondition.push({ id: data.perfumeId });
  });

  const perfumes = await prisma.perfume.findMany({
    where: {
      OR: findManyOrCondition,
    },
    select: {
      id: true,
      name_eng: true,
      brand_eng: true,
      top: true,
      middle: true,
      bottom: true,
      imgUrl: true,
    },
    orderBy: {
      viewCount: "desc",
    },
  });

  for (let i = 0; i < perfumes.length; i++) {
    const perfumeNote = await prisma.perfume_CategoryInfo.findMany({
      where: {
        name_eng: perfumes[i].name_eng,
      },
      select: {
        note: true,
      },
    });

    perfumes[i]["note"] = perfumeNote[0].note;
  }

  return res.status(200).send(perfumes);
}
