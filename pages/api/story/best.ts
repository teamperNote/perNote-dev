// 인기 스토리 반환 기능 - 좋아요 개수로 선정

import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const accessToken = req.headers.authorization.split("Bearer ")[1];

  const isLiked = [];
  const allStoryIdForUserLike = [];

  const allStories = await prisma.story.findMany({
    orderBy: {
      likeCount: "desc",
    },
  });
  const bestStories = allStories.slice(0, 5);

  // 1. 비로그인 유저
  if (accessToken === "null") {
    bestStories.forEach((value: any) => {
      isLiked.push(Object.assign(value, { liked: false }));
    });
  }
  // 2. 로그인 유저
  else {
    const { payload } = await jwtVerify(accessToken, secretKey);

    const userId = payload.iss;

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
