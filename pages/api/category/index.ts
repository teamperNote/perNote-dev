import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import like from "./like";

const prisma = new PrismaClient();

// request되는 카테고리(노트, 브랜드, 성격, 특징)에 따라 해당하는 데이터 서치.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // OPTIONS FROM QUERY
  const query = req.query;
  const category = query.category as string;
  const selected = query["selected"] as string;
  const userId = query.userId;
  const orderOpt = query.orderOpt as string;

  // PERFUME OPTION
  const names = [];

  const categoryInfo = await prisma.perfume_CategoryInfo.findMany({
    where: {
      [category]: {
        has: selected,
      },
    },
    orderBy: {
      [orderOpt]: "desc",
    },
  });
  if (!categoryInfo) {
    return res.status(404).json({
      message: "Error: No categoryInfo",
    });
  }
  categoryInfo.map((data) => {
    names.push(data.name_eng);
  });

  const perfumes = await prisma.perfume.findMany({
    where: {
      name_eng: {
        in: names,
      },
    },
    select: {
      id: true,
      name_eng: true,
      brand_eng: true,
      imgUrl: true,
      likeCount: true,
    },
  });
  if (!perfumes) {
    return res.status(404).json({
      message: "Error: No perfumes",
    });
  }

  const perfumeAfterLike = like(perfumes, userId);

  return res.status(200).json({
    perfumes: perfumeAfterLike,
    query: query,
    // categoryInfo,
    //    test
  });
}
