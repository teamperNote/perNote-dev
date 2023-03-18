import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Initiate response data
  let resStatus, resData;

  const query = req.query;
  const userId = query.userId as string;
  const orderOpt = query.orderId as string;
  const sortOpt = orderOpt === "name_eng" ? "asc" : "desc";

  if (!userId) {
    resStatus = 400;
    resData = {
      message: "Error: perfumeLike/userLiked - No userId",
    };
  } else {
    const perfumeLiked = await prisma.perfumeLike.findMany({
      where: {
        userId: userId,
      },
      select: {
        perfumeId: true,
      },
      orderBy: {
        [orderOpt]: sortOpt,
      },
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
        note: true,
      },
    });

    resStatus = 200;
    resData = perfumes;
  }

  await prisma.$disconnect();

  return res.status(resStatus).send(resData);
}
