import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { name, phoneNumber, birth, gender, userId } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        phoneNumber,
        birth,
        gender,
        snsId: userId,
        snsType: "google",
      },
    });

    return res.status(200).json(user);
  }
}
