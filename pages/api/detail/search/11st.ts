import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import useSWR from "swr";
import { xml2js } from "xml-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    
    const query = req.query;
    const keyword = query.brand + " " + query.name;

    const apiKey = process.env.NEXT_PUBLIC_11ST_API_KEY;
    const apiURL = `http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${apiKey}&apiCode=ProductSearch&keyword=${keyword}&sortCd=L`

    const xmlData = await axios
        .get(apiURL)
        .then(res => res.data);
    const options = {compact: true, ignoreComment: true, spaces: 4};
    const data = xml2js(xmlData, options);

    return res.status(200).json(
        {
            data,
            query: query
        }
    )
}