import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { perfumeId } = req.body;
    const accessToken = req.headers.authorization.split("Bearer ")[1];

    const { payload } = await jwtVerify(accessToken, secretKey);

    const userId = payload.iss;

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
        return res.status(400).json({
          message: "잘못된 id 접근",
        });
      }

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

      return res.status(200).json({
        message: "좋아요 취소 성공",
      });
    }
  } else {
    return res.status(400).json({
      message: "Error: Wrong HTTP method. (Not POST)",
    });
  }
}
