import type { NextPage } from "next";
import useSWR from "swr";
import axios from "axios";

// const fetcher = (url: URL) => fetch(url).then((res) => res.json());
const fetcher = (url: string) => axios
    .get(url, {params: {
        // sex: "m", 
        // season: "spring",
        // color: "red", 
        // personality: "calm", 
        // feature: "fresh", 
        // concentration: "daily",
        name: "a winter melody",
        brand: "gucci"
    }})
    .then(res => res.data);
    // axios.get의 params에 array를 입력하면 property 뒤에 []이 붙는다. ex) sex => sex[]

const Test: NextPage = () => {
    // const {data, error} = useSWR('/api/db/personalScent', fetcher); // personalScent Test Section
    const {data, error} = useSWR('/api/search/naver', fetcher);

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
