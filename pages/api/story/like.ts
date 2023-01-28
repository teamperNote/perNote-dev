// 유저의 perfumeStory 좋아요 클릭(좋아요/ 좋아요 취소 둘다 처리)
// 예외 처리 필요? 존재하지 않는 id가 들어오는 경우는 사실상 없긴함

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

    // 잘못된 userId or storyId 로 접근하면 connect에서 에러 걸림
    // try-catch로 에러 핸들링 필요
    if (isLiked.length === 0) {
      try {
        await prisma.storyLike.create({
          data: {
            user: {
              connect: { id: userId },
            },
            story: {
              connect: { id: storyId },
            },
          },
        });

        await prisma.story.update({
          where: { id: storyId },
          data: {
            likeCount: { increment: 1 },
          },
        });
      } catch (e) {
        return res.status(400).json({
          message: "잘못된 id 접근",
        });
      }

      return res.status(200).json({
        message: "좋아요 요청 성공",
      });
    } else {
      await prisma.storyLike.deleteMany({
        where: { userId, storyId },
      });
      await prisma.story.update({
        where: { id: storyId },
        data: {
          likeCount: { decrement: 1 },
        },
      });

      return res.status(200).json({
        message: "좋아요 취소 성공",
      });
    }
  }
}
