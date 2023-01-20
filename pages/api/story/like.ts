// 유저의 perfumeStory 좋아요 클릭(좋아요/ 좋아요 취소 둘다 처리) - POST

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { userId, storyId } = req.body;

    const isLiked = await prisma.storyLike.findMany({
      where: { userId, storyId },
    });

    if (isLiked.length === 0) {
      const createStoryLike = await prisma.storyLike.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          story: {
            connect: {
              id: storyId,
            },
          },
        },
      });

      const updateStory = await prisma.story.update({
        where: {
          id: storyId,
        },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      });

      return res.status(200).json({
        createStoryLike,
        updateStory,
      });
    } else {
      const deleteStoryLike = await prisma.storyLike.deleteMany({
        where: {
          userId,
          storyId,
        },
      });
      const updateStory = await prisma.story.update({
        where: { id: storyId },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      });

      return res.status(200).json({
        deleteStoryLike,
        updateStory,
      });
    }
  }
}
