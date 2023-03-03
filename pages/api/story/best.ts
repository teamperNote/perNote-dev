// 인기 스토리 반환 기능 - 좋아요 개수로 선정

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.body;

  const allStories = await prisma.story.findMany({
    orderBy: {
      likeCount: "desc",
    },
  });
  const bestStories = allStories.slice(0, 5);

  const isLiked = [];
  const allStoryIdForUserLike = [];

  // 1. 비로그인 유저
  if (!userId) {
    bestStories.forEach((value: any) => {
      isLiked.push(Object.assign(value, { liked: false }));
    });
  }
  // 2. 로그인 유저
  else {
    const allStoryLikeForUser = await prisma.storyLike.findMany({
      where: { userId },
      include: {
        story: true,
      },
    });
    allStoryLikeForUser.forEach((value: any) => {
      allStoryIdForUserLike.push(value.story.id);
    });
    bestStories.forEach((value: any) => {
      if (allStoryIdForUserLike.includes(value.id)) {
        isLiked.push(Object.assign(value, { liked: true }));
      } else {
        isLiked.push(Object.assign(value, { liked: false }));
      }
    });
  }

  return res.status(200).json(isLiked);
}
