import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import useSWR from "swr";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const query = req.query;
    const keyword = query.brand + " " + query.name;
    
    const clientId = process.env.NEXT_PUBLIC_SHOPPING_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SHOPPING_CLIENT_SECRET;
    const naverURL = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURI(keyword)}&display=10&start=1&sort=sim`;

    const data = await axios
        .get(naverURL, {
            headers: {
                'X-Naver-Client-Id':clientId, 
                'X-Naver-Client-Secret': clientSecret
            }
    })
    .then(res => res.data);

    return res.status(200).json(
        {
            data,
            query: query
        }
    );
}