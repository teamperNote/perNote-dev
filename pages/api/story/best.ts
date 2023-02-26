// 인기 스토리 반환 기능 - 좋아요 개수로 선정

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const allStories = await prisma.story.findMany({
    orderBy: {
      likeCount: "desc",
    },
  });
  const bestStories = allStories.slice(0, 4);

  return res.status(200).json(bestStories);
}
