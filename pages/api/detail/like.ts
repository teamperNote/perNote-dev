import prisma from "../../../prisma/client";

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
        AND: [{ userId: userId }, { perfumeId: perfumeId }],
      },
    });

    isLiked = likeCheck.length > 0 ? true : false;
  }

  return isLiked;
}
