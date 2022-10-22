import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html,
    body {
    padding: 0;
    margin: 0;
    font-family: 'NanumSquare', sans-serif;
    }
    .normal		{ font-weight: 400 }
    .bold		{ font-weight: 700 }
    

    a {
    color: inherit;
    text-decoration: none;
    }

    * {
    box-sizing: border-box;
    }

    /* @media (prefers-color-scheme: dark) {
    html {
        color-scheme: dark;
    }
    body {
        color: white;
        background: black;
    }
    } */
`;
