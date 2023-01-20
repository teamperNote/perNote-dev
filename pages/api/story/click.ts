import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const storyId = req.query.storyId as string;

  const updatedStory = await prisma.story.update({
    where: { id: storyId },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });

  return res.status(200).json(updatedStory);
}
