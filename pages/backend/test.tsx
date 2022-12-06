import type { NextPage } from "next";
import useSWR from "swr";
import axios from "axios";

// const fetcher = (url: URL) => fetch(url).then((res) => res.json());
const fetcher = (url: string) => axios
    .get(url, {params: {
        // // TEST SECTION - personalScent
        // gender: "mUni", 
        // season: "spring",
        // color: "red", 
        // personality: "calm", 
        // feature: "fresh", 
        // concentration: "daily",

        // TEST SECTION - shopping
        name: "a winter melody",
        brand: "gucci"  

        // // TEST SECTION - detail
        // category: 'note',
        // selected: ["amber", "woody"]
    }})
    .then(res => res.data);
    // axios.get의 params에 array를 입력하면 property 뒤에 []이 붙는다. ex) sex => sex[]

const Test: NextPage = () => {
    // const {data, error} = useSWR('/api/db/personalScent', fetcher); // personalScent Test Section
    const {data, error} = useSWR('/api/detail/search/11st', fetcher); // 네이버 쇼핑 API 결과 0개면 결과없음이라고 알려주기. 프론트쪽 UI도 표시해줘야함.

    if(error) return <div>An error occured.</div>
    if(!data) return <div>Loading...</div>
    console.log(data);

    // let wantToPrint = process.env.NEXT_PUBLIC_SHOPPING_CLIENT_ID;
    // console.log(wantToPrint)

    return (
        // <ul>
        //     personalScent Test Section
        //         {data.perfumes.map(perfume => (
        //         <li key={perfume.id}>{perfume.name}</li>
        //     ))}
        // </ul>
        <div>
            <p>
                {}
            </p>
        </div>
        
    );
}

export default Test;