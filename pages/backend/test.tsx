import type { NextPage } from "next";

const test: NextPage = ({results}) => {
    return (
        <div>
            {results}
        </div>
    );
}

export default test;

/*
Server Error
Error: Error serializing `.results` returned from `getServerSideProps` in "/backend/test".
Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.

This error happened while generating the page. Any console logs will be displayed in the terminal window.
*/

export async function getServerSideProps(){
    const {results} = await (await fetch(
        'http://localhost:3005/api/db/personalScent'
    )).json();
    
    return {
        props: {
            results,
        }
    };
}