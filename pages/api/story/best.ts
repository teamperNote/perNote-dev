// 인기 스토리 반환 기능 - 좋아요 개수로 선정
// 좋아요 개수가 동일한 경우 2차 기준은?

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
  const bestStory = allStories[0];

  return res.status(200).json(bestStory);
}
