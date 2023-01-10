import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(401).json({
    message: "액세스 토큰이 없습니다",
  });
}
