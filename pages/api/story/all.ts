import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const role = req.headers.authorization;

  const isLiked = [];
  const allStoryIdForUser = [];
  const allStories = await prisma.story.findMany();

  // 1. 비로그인 시 바로 전체 perfumeStory 반환
  if (!role) {
    allStories.forEach((data) => {
      isLiked.push(Object.assign(data, { liked: false }));
    });
  }

  // 2. 로그인 시 해당 유저의 좋아여 여부를 포함한 전체 perfumeStory 반환
  else {
    const accessToken = role.split("Bearer ")[1];
    const { payload } = await jwtVerify(accessToken, secretKey);

    const userId = payload.iss;

    const allStroyLikeForUser = await prisma.storyLike.findMany({
      where: { userId },
      include: {
        story: true,
      },
    });
    allStroyLikeForUser.forEach((data) => {
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
