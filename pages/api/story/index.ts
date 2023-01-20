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
  const allStories = await prisma.story.findMany();

  // 1. 비로그인 시 바로 전체 perfumeStory 반환
  if (!userId) {
    allStories.forEach((data) => {
      isLiked.push(Object.assign(data, { liked: false }));
    });
  }

  // 2. 로그인 시 해당 유저의 좋아여 여부를 포함한 전체 perfumeStory 반환
  else {
    const storyLikesForUser = await prisma.storyLike.findMany({
      where: { userId },
      include: {
        story: true,
      },
    });
    storyLikesForUser.forEach((data) => {
      allStoryIdForUser.push(data.story.id);
    });

    allStories.forEach((data) => {
      if (allStoryIdForUser.includes(data.id)) {
        isLiked.push(Object.assign(data, { liked: true }));
      } else {
        isLiked.push(Object.assign(data, { liked: false }));
      }
    });
  }

  return res.status(200).json(isLiked);
}
