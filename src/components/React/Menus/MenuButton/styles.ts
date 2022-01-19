import styled from "styled-components";

export const Template = styled.div`
        width: 100%;
        min-height: 3.5em;
        position: relative;
        background: #ededed;
        padding-top: 0.3em;

    footer{
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 100%;
        background-color: #ffffff;
    }
`
export const Button = styled.button`
    border: 2px solid transparent;
    vertical-align: middle;
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: center;
    background-color: transparent;
    min-width: auto;
    padding: 0 2px;

    .active{
        color: var(--cor-main);
    }
`

export const ButtonFlex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`