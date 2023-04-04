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

    a {
        color: inherit;
        text-decoration: none;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    h1, h2, h3, h4{
        margin: 0
    }

    * {
        box-sizing: border-box;
        font-family: 'Noto Sans KR';
        font-style: normal;
    }

    .read-only{
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
    }

    .bold { 
        font-weight: 700
    }
    .medium { 
        font-weight: 500 
    }
    .regular { 
        font-weight: 400 
    }

    .f80{
        font-size: 5rem;
        line-height: 7.25rem;
    }

    .f50 {
        font-size: 3.125rem;
        line-height: 4.5rem;
    }

    .f40 {
        font-size: 2.5rem;
        line-height: 3.625rem;
    }

    .f35 {
        font-size: 2.1875rem;
        line-height: 3.1875rem;
    }

    .f30 {
        font-size: 1.875rem;
        line-height: 2.6875rem;
    }

    .f25 {
        font-size: 1.5625rem;
        line-height: 2.25rem;
    }

    .f20 {
        font-size: 1.25rem;
        line-height: 1.8125rem;
    }
`;
