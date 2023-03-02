// - 향수 데이터 가져오기
//     1. 이름으로 서치.
//     2. 노트, 성격, 특징, 상세설명, 탑노트, 미들노트, 베이스노트 가져오기.

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import similar from "./similar";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id: string = req.query.id as string;

  await prisma.perfume.updateMany({
    where: {
      id: id,
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });

  const perfume = await prisma.perfume.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      brand_eng: true,
      name_eng: true,
      imgUrl: true,

      concentration: true,
      gender: true,

      top: true,
      middle: true,
      bottom: true,

      likeCount: true,
      viewCount: true,
    },
  });
  if (!perfume) {
    return res.status(404).json({
      message: "Error: detail - DB perfume",
    });
  }

  const perfume_detail = await prisma.perfumeDetail.findMany({
    where: {
      name: perfume.name_eng,
    },
    orderBy: {
      ml: "asc",
    },
  });
  if (!perfume_detail) {
    return res.status(404).json({
      message: "Error: detail - DB perfume_detail",
    });
  }

  if (perfume_detail.length > 0) {
    const ml = {};

    for (const key in perfume_detail) {
      const loop = perfume_detail[key];

      ml[loop.ml] = {
        price: loop.price,
        url: loop.originUrl,
      };
    }

    perfume["ml"] = ml;
    perfume["description"] = perfume_detail[0].description;
  }

  const categoryInfo = await prisma.perfume_CategoryInfo.findFirst({
    where: {
      name_eng: perfume.name_eng,
    },
    select: {
      note: true,
      feature: true,
      personality: true,
    },
  });

  for (const [key, val] of Object.entries(categoryInfo)) {
    perfume[key] = val;
  }

  const similars = await similar(perfume);
  perfume["similars"] = similars;

  delete perfume.concentration;
  delete perfume.gender;

  return res.status(200).json({
    perfume: perfume,
    query: id,
  });
}
