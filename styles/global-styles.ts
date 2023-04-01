import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html,
    body {
    width: 100%; 
    height: 100%; 
    padding: 0;
    margin: 0;
    font-family: 'NanumSquare', sans-serif;
    font-size: 16px; 
    @media screen and (max-width: 1440px) {
        font-size: 14px;
    }
    @media screen and (max-width: 480px) {
        font-size: 12px;
    }
    }
    .normal		{ font-weight: 400 }
    .bold		{ font-weight: 700 }
    

    a {
        color: inherit;
        text-decoration: none;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    h1, h2,h3, h4{
        margin: 0
    }

    * {
    box-sizing: border-box;
    }

    .read-only{
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
    }

`;
