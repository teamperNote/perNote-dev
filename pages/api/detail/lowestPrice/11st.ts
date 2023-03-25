import axios from "axios";
import { xml2js } from "xml-js";

export default async function lowest11st(query) {
  const keyword = "perfume " + query.brand + " " + query.name;

  const apiKey = process.env.NEXT_PUBLIC_11ST_API_KEY;
  const apiURL = `http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${apiKey}&apiCode=ProductSearch&keyword=${keyword}&pageSize=1&sortCd=CP`;

  const xmlData = await axios.get(apiURL).then((res) => res.data);
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  const data = xml2js(xmlData, options);

  return {
    domain: "11st",
    name: data["ProductSearchResponse"]["Products"]["Product"]["ProductName"][
      "_cdata"
    ],
    price:
      data["ProductSearchResponse"]["Products"]["Product"]["SalePrice"][
        "_text"
      ],
    url: data["ProductSearchResponse"]["Products"]["Product"]["DetailPageUrl"][
      "_cdata"
    ],
    // data,
    // query: query,
  };
}
