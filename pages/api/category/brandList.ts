import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const dict = {};

  for (let i = 65; i <= 90; i++) {
    dict[String.fromCharCode(i)] = [];
  }

  const brands = await prisma.brand.findMany({
    select: {
      id: true,
      name_eng: true,
      imgUrl: true,
    },
    orderBy: {
      name_eng: "asc",
    },
  });
  if (!brands) {
    return res.status(200).json({
      message: "Error: /category/brand",
    });
  }

  for (const brand of brands) {
    const head = brand.name_eng[0].toUpperCase(); // 추후 upperCase 제거
    if (!dict[head]) {
      return res.status(404).json({
        message: "Error: /category/brand - wrong data",
      });
    }
    dict[head].push(brand);
  }

  return res.status(200).json({
    dict,
  });
}
