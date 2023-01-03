import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { title, body, tags } = req.body;

    const createPost = await prisma.story.create({
      data: {
        title,
        body,
        tags,
      },
    });

    return res.status(200).json(createPost);
  }
}
