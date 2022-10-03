import type { NextPage } from "next";

const test: NextPage = ({results}) => {
    return (
        <div>
        </div>
    );
}

export default test;

export async function getServerSideProps(){
    const {results} = await (await fetch(
        'http://localhost:3005/api/db'
    )).json();
    
    return {
        props: {
            results,
        }
    };
}