import axios from "axios";

export default async function lowestNaver(query) {
  const keyword = "perfume " + query.brand + " " + query.name;

  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;
  const apiURL = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURI(
    keyword,
  )}&display=1&start=1&sort=sim`;

  const data = await axios
    .get(apiURL, {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
    })
    .then((res) => res.data);

  return {
    name: data["items"][0]["title"],
    price: data["items"][0]["lprice"],
    url: data["items"][0]["link"],
    // query: query,
  };
}
