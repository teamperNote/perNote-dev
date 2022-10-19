import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function personalScent(req: NextApiRequest, res: NextApiResponse){
    const { selected } = req.body; // 유저가 선택한 쿼리들. ex) 봄, 깊은 등

    const perfume = await prisma.perfume.findMany();
    if(!perfume) {
        return res.status(200).json({
            message: "No such perfume found"
        });
    }

    return res.status(200).json({
        perfume
    });
}
