import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const client_id = process.env.GOOGLE_CLIENT_ID || "";
const client_secret = process.env.GOOGLE_CLIENT_SECRET || "";
const redirect_uri = process.env.GOOGLE_REDIRECT_URI || "";
const secretKey = process.env.JWT_SECRET_KEY || "";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { access_token } = req.body;

  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
  );

  let user = await prisma.user.findUnique({
    where: { username: data.id },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        username: data.id,
        email: data.email,
        name: data.name,
        password: "",
        phoneNumber: data.id,
        gender: "",
        snsType: "google",
      },
    });
  }

  const accessToken = jwt.sign({ userId: user.username }, secretKey, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ userId: user.username }, secretKey, {
    expiresIn: "14d",
  });

  res.status(200).json({
    user,
    accessToken,
    refreshToken,
  });
}
