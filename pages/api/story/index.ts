import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "../../../prisma/client";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { title, body, tags, imgUrl } = req.body;

    const createdPost = await prisma.story.create({
      data: {
        title,
        body,
        tags,
        imgUrl,
      },
    });

    return res.status(200).json(createdPost);
  }
  if (req.method === "GET") {
    const role = req.headers.authorization;

    const storyId = req.query.storyId as string;

    // 스토리 클릭 시, 조회수 증가
    await prisma.story.update({
      where: { id: storyId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    const isLiked = []; // 좋아요 여부가 포함된 전체 perfumeStory 배열
    const allStoryIdForUser = [];

    const perfumeStories = await prisma.story.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    // 1. 비로그인 유저
    if (!role) {
      perfumeStories.forEach((value) => {
        isLiked.push(Object.assign(value, { liked: false }));
      });
    }
    // 2. 로그인 유저
    else {
      const accessToken = role.split("Bearer ")[1];
      const { payload } = await jwtVerify(accessToken, secretKey);

      const userId = payload.iss;

      const storyLikesForUser = await prisma.storyLike.findMany({
        where: { userId },
        include: {
          story: true,
        },
      });
      storyLikesForUser.forEach((data) => {
        allStoryIdForUser.push(data.story.id);
      });

      perfumeStories.forEach((value) => {
        if (allStoryIdForUser.includes(value.id)) {
          isLiked.push(Object.assign(value, { liked: true }));
        } else {
          isLiked.push(Object.assign(value, { liked: false }));
        }
      });
    }

    let targetIndex = 0;
    isLiked.forEach((value, index) => {
      if (value.id === storyId) {
        targetIndex = index;
      }
    });
    const targetStory = perfumeStories[targetIndex];
    const prevStory = perfumeStories[targetIndex - 1];
    const nextStory = perfumeStories[targetIndex + 1];

    return res.status(200).json({
      targetStory,
      prev: prevStory,
      next: nextStory,
    });
  }
  if (req.method === "DELETE") {
    const storyId = req.query.storyId as string;

    const deletedStory = await prisma.story.delete({
      where: { id: storyId },
    });

    return res.status(200).json(deletedStory);
  }
}
