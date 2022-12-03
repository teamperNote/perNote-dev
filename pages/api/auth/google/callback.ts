import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const client_id = process.env.GOOGLE_CLIENT_ID || "";
const client_secret = process.env.GOOGLE_CLIENT_SECRET || "";
const redirect_uri = process.env.GOOGLE_REDIRECT_URI || "";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  const body = `grant_type=authorization_code&code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_url=${redirect_uri}`;

  const result = await axios({
    url: "https://oauth2.googleapis.com/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    method: "POST",
    data: body,
  });

  const { access_token } = result.data;
}
