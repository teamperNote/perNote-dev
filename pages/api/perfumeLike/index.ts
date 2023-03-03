// 유저의 perfume 좋아요 클릭(좋아요/ 좋아요 취소 둘다 처리)

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { userId, perfumeId } = req.body;

    const isLiked = await prisma.perfumeLike.findMany({
      where: { userId, perfumeId },
    });

    if (isLiked.length === 0) {
      try {
        await prisma.perfumeLike.create({
          data: {
            user: {
              connect: { id: userId },
            },
            perfume: {
              connect: { id: perfumeId },
            },
          },
        });

        await prisma.perfume.update({
          where: { id: perfumeId },
          data: {
            likeCount: { increment: 1 },
          },
        });
      } catch (e) {
        await prisma.$disconnect();
        return res.status(400).json({
          message: "잘못된 id 접근",
        });
      }

      await prisma.$disconnect();
      return res.status(200).json({
        message: "좋아요 요청 성공",
      });
    } else {
      await prisma.perfumeLike.deleteMany({
        where: { userId, perfumeId },
      });
      await prisma.perfume.update({
        where: { id: perfumeId },
        data: {
          likeCount: { decrement: 1 },
        },
      });

      await prisma.$disconnect();
      return res.status(200).json({
        message: "좋아요 취소 성공",
      });
    }
  } else {
    await prisma.$disconnect();
    return res.status(400).json({
      message: "Error: Wrong HTTP method. (Not POST)",
    });
  }
}
