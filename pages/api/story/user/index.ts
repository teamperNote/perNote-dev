// 유저의 좋아요 여부를 포함한 전체 perfumeStory 반환

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = req.query.userId as string;

  const isLiked = [];
  const allStoryIdForUser = [];

  const storyLikesForUser = await prisma.storyLike.findMany({
    where: { userId },
    include: {
      story: true,
    },
  });
  storyLikesForUser.forEach((data) => {
    allStoryIdForUser.push(data.story.id);
  });

  const allStories = await prisma.story.findMany();

  allStories.forEach((data) => {
    if (allStoryIdForUser.includes(data.id)) {
      isLiked.push(Object.assign(data, { liked: true }));
    } else {
      isLiked.push(Object.assign(data, { liked: false }));
    }
  });

  return res.status(200).json(isLiked);
}
