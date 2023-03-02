import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function like(perfumeId, userId) {
  let isLiked;

  // 1. 비로그인 유저
  if (!userId) {
    isLiked = false;
  }
  // 2. 로그인 유저
  else {
    const likeCheck = await prisma.perfumeLike.findMany({
      where: {
        userId: userId,
        perfumeId: perfumeId,
      },
    });

    isLiked = likeCheck ? true : false;
  }

  return isLiked;
}
