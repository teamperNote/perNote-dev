import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

const secretKey = process.env.JWT_SECRET_KEY || "";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { access_token } = req.body;

  const result = await axios.get("https://openapi.naver.com/v1/nid/me", {
    headers: { Authorization: "Bearer " + access_token },
  });
  const userInfo = result.data.response;

  let user = await prisma.user.findUnique({
    where: { username: userInfo.id },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        username: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        password: "",
        phoneNumber: userInfo.mobile,
        gender: "",
        snsType: "naver",
      },
    });
  }

  const accessToken = jwt.sign({ userId: user.username }, secretKey, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ userId: user.username }, secretKey, {
    expiresIn: "14d",
  });

  return res.status(200).json({
    user,
    accessToken,
    refreshToken,
  });
}
