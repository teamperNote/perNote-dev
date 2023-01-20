import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { title, body, tags } = req.body;

    const createdPost = await prisma.story.create({
      data: {
        title,
        body,
        tags,
      },
    });

    return res.status(200).json(createdPost);
  }
  if (req.method === "GET") {
    const storyId = req.query.storyId as string;

    const clickedStory = await prisma.story.update({
      where: { id: storyId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return res.status(200).json(clickedStory);
  }
  if (req.method === "DELETE") {
    const storyId = req.query.storyId as string;

    const deletedStory = await prisma.story.delete({
      where: { id: storyId },
    });

    return res.status(200).json(deletedStory);
  }
}
