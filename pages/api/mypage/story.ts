import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const role = req.headers.authorization;

  const accessToken = role.split("Bearer ")[1];
  const { payload } = await jwtVerify(accessToken, secretKey);

  const userId = payload.iss;

  const allStoriesForUser = [];

  const allStoryLikesForUser = await prisma.storyLike.findMany({
    where: { userId },
    include: {
      story: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  allStoryLikesForUser.forEach((value: any) => {
    allStoriesForUser.push(Object.assign(value.story, { liked: true }));
  });

  return res.status(200).json(allStoriesForUser);
}
