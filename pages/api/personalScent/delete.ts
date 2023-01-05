import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  // test id를 request로 받음 => test DB에서 해당 row를 삭제 ⇒ perfume DB의 testIDs column에서 해당하는 test id를 제거
  
    const query = req.query
    const testId = query.testId as string

    const test = await prisma.test.delete({
        where: {
            id: testId
        },
        select: {
            id: true,
            perfumeIDs: true,
            createdAt: true
        }
    })
    if(!test) {
      return res.status(200).json({
        message: "Error: personalScent/delete"
      })
    }

    for(const perfumeId of test.perfumeIDs){
      const perfume = await prisma.perfume.findUnique({
          where: {
            id: perfumeId,
          },
          select: {
            testIDs: true
          }
      })
      if(!perfume) {
        return res.status(200).json({
          message: "Error: personalScent/delete - inner loop(perfume)"
        })
      }

      const newTestIDs =  perfume.testIDs.filter(perfumeTestId => perfumeTestId !== testId)

      const newPerfume = await prisma.perfume.update({
        where: {
          id: perfumeId
        },
        data: {
          testIDs: newTestIDs
        }
      })
      if(!newPerfume) {
        return res.status(200).json({
          message: "Error: personalScent/delete - inner loop(newPerfume)"
        })
      }
    }


    return res.status(200).json({
      result: test,
    })
}