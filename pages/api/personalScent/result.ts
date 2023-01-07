import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const query = req.query
    const testId = query.testId as string

    const testResultDB = await prisma.test.findMany({
        where: {
          id: testId
        },
        select: {
          perfumes: true,
          perfumeIDs: true // For console
        }
    })
    if(!testResultDB) {
      return res.status(200).json({
        message: "Error: personalScent/result"
      })
    }

    return res.status(200).json({
      test: testResultDB,
      // elem: testResultDB[0]
    })
}