import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const role = req.headers.authorization;
  const orderOpt = req.query.orderOpt as string;
  const sortOpt = orderOpt === "createdAt" ? "asc" : "desc";

  const accessToken = role.split("Bearer ")[1];
  const { payload } = await jwtVerify(accessToken, secretKey);

  const userId = payload.iss;

  const storyLiked = await prisma.storyLike.findMany({
    where: { userId },
    select: { storyId: true },
  });

  const findManyOrCondition = [];
  storyLiked.forEach((data: any) => {
    findManyOrCondition.push({ id: data.storyId });
  });

  const stories = await prisma.story.findMany({
    where: {
      OR: findManyOrCondition,
    },
    orderBy: {
      [orderOpt]: sortOpt,
    },
  });

  return res.status(200).json(stories);
}
