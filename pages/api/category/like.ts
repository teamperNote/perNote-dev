import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function like(perfumes, userId) {
  const isLiked = [];
  const allPerfumeIdForUser = [];

  // 1. 비로그인 유저
  if (!userId) {
    perfumes.forEach((value) => {
      isLiked.push(Object.assign(value, { liked: false }));
    });
  }
  // 2. 로그인 유저
  else {
    const perfumeLikesForUser = await prisma.perfumeLike.findMany({
      where: { userId },
      include: {
        perfume: true,
      },
    });
    perfumeLikesForUser.forEach((data) => {
      allPerfumeIdForUser.push(data.perfume.id);
    });

    for (let i = 0; i < perfumes.length; i++) {
      if (allPerfumeIdForUser.includes(perfumes[i].id)) {
        perfumes[i].liked = true;
      } else {
        perfumes[i].liked = false;
      }
    }
  }

  await prisma.$disconnect();

  return perfumes;
}
