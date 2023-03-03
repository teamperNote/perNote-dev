import type { NextApiRequest, NextApiResponse } from "next";
import bcrpyt from "bcrypt";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, newPassword } = req.body;

    const hashedNewPassword = await bcrpyt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedNewPassword },
    });

    return res.status(200).json(updatedUser);
  }
}
