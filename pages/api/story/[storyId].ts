import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const storyId = req.query.storyId as string;

    const story = await prisma.story.findUnique({
      where: { id: storyId },
    });

    return res.status(200).json(story);
  }
  if (req.method === "DELETE") {
    const storyId = req.query.storyId as string;

    const deleteStory = await prisma.story.delete({
      where: { id: storyId },
    });

    return res.status(200).json(deleteStory);
  }
}
