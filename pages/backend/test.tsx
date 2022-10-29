import type { NextPage } from "next";
import useSWR from "swr";
import axios from "axios";

// const fetcher = (url: URL) => fetch(url).then((res) => res.json());
const fetcher = (url: string) => axios
    .get(url, {params: {
        sex: "m", 
        season: "spring",
        color: "red", 
        personality: "calm", 
        feature: "fresh", 
        concentration: "daily"
    }})
    .then(res => res.data);
    // axios.get의 params에 array를 입력하면 property 뒤에 []이 붙는다. ex) sex => sex[]

const Test: NextPage = () => {
    const {data, error} = useSWR('/api/db/personalScent', fetcher);
    
    if(error) return <div>An error occured.</div>
    if(!data) return <div>Loading...</div>
    console.log(data);

    return (
        <ul>
            {data.perfumes.map(perfume => (
                <li key={perfume.id}>{perfume.name}</li>
            ))}
        </ul>
    );
}

export default Test;

/*
Server Error
Error: Error serializing `.results` returned from `getServerSideProps` in "/backend/test".
Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.

This error happened while generating the page. Any console logs will be displayed in the terminal window.
*/

// export async function getServerSideProps(){
//     const test1 = await fetch(
//         'http://localhost:3005/api/db/personalScent'
//     );
//     const test2 = await test1.json();

//     // const {results} = await (await fetch(
//     //     'http://localhost:3005/api/db/personalScent'
//     // )).json();
    
//     return {
//         props: {
//             test2,
//         }
//     };
// }