import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --cor-main: #0074cc;
}

*{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    font-family: 'Roboto','Open Sans', sans-serif; 
}

html, body, #root{
    height: 100vh;
    width: 100vw;
    scroll-behavior: smooth;
}


input, select, textarea { }

h1, h2, h3, h4, h5, h6 { }

a{
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: unset;
}

svg{
    transform: rotate(0deg);
}

button{
    cursor: pointer;
}
`;