// - 향수 데이터 가져오기
//     1. 이름으로 서치.
//     2. 노트, 성격, 특징, 상세설명, 탑노트, 미들노트, 베이스노트 가져오기.

import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "../../../prisma/client";
import similar from "./similar";
import like from "./like";
import lowest11st from "./lowestPrice/11st";
import lowestNaver from "./lowestPrice/naver";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const role = req.headers.authorization;

  const accessToken = role.split("Bearer ")[1];
  const { payload } = await jwtVerify(accessToken, secretKey);

  const userId = payload.iss;
  const perfumeId = req.query.perfumeId as string;
  if (!perfumeId) {
    return res.status(400).json({
      message: "Error: No perfumeId",
    });
  }

  // INCREASE VIEWCOUNT
  await prisma.perfume.updateMany({
    where: {
      id: perfumeId,
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });

  // FIND PERFUME WITH ID
  const perfume = await prisma.perfume.findFirst({
    where: {
      id: perfumeId,
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

  // FIND PERFUME DETAIL
  // const perfume_detail = await prisma.perfumeDetail.findMany({
  //   where: {
  //     name: perfume.name_eng,
  //   },
  //   orderBy: {
  //     ml: "asc",
  //   },
  // });
  // if (!perfume_detail) {
  //   return res.status(404).json({
  //     message: "Error: detail - DB perfume_detail",
  //   });
  // }

  // if (perfume_detail.length > 0) {
  //   const ml = {};

  //   for (const key in perfume_detail) {
  //     const loop = perfume_detail[key];

  //     ml[loop.ml] = {
  //       price: loop.price,
  //       url: loop.originUrl,
  //     };
  //   }

  //   perfume["ml"] = ml;
  //   perfume["description"] = perfume_detail[0].description;
  // }

  // ADDS NOTES, FEATURES, PERSONALITIES
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

  // ADDS SIMLIAR PERFUMES
  const similars = await similar(perfume);
  perfume["similars"] = similars;

  // CALLS LIKE INFO
  perfume["liked"] = await like(perfumeId, userId);

  perfume["lowest"] = [];
  perfume["lowest"].push(
    await lowest11st({
      name: perfume.name_eng,
      brand: perfume.brand_eng,
    }),
  );
  perfume["lowest"].push(
    await lowestNaver({
      name: perfume.name_eng,
      brand: perfume.brand_eng,
    }),
  );

  delete perfume.concentration;
  delete perfume.gender;

  return res.status(200).json({
    perfume: perfume,
    query: perfumeId,
  });
}
