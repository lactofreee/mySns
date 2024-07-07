import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    // 적용시킬 css 입력
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    body{
        line-height: 1;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: white;
        height: 100vh;
        font-size: 16px;
        color: white;
        background-color: #212121;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        cursor: pointer;
    }
`;

export default GlobalStyles;
