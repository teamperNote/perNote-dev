import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const query = req.query
    const testId = query.testId as string

    const test = await prisma.test.delete({
        where: {
            id: testId
        },
        select: {
            id: true,
            createdAt: true
        }
    })
    if(!test) {
      return res.status(200).json({
        message: "Error: personalScent/delete"
      })
    }

    return res.status(200).json({
      result: test
    })
}