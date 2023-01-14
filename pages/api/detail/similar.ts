import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function similar(id){
    const perfume = await prisma.perfume.findFirst({
        where: {
            id: id
        }
    })

    return perfume
}