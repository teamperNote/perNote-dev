import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const secretKey = process.env.JWT_SECRET_KEY || "";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { access_token } = req.body;

  const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  const userInfo = result.data;

  // SNS계정으로 회원가입 한 경우, 로컬 회원가입 불가
  const { profile, email } = userInfo.kakao_account;

  let user = await prisma.user.findFirst({
    where: { username: userInfo.id.toString() },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        username: userInfo.id.toString(),
        email: "",
        name: profile.nickname,
        password: "",
        phoneNumber: "",
        gender: "",
        snsType: "kakao",
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
