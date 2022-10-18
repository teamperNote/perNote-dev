import prisma from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    id: String,
    title: String,
    body: String
}

export default async function handler(
        req: NextApiRequest,
        res: NextApiResponse<Data>
    ) {

        const post = await prisma.post.create({
            data: {
                title: 'My first post',
                body: 'My first post body'
            }
        })

        res.status(200).json(post)
}
  