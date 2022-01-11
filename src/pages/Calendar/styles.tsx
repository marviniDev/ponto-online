import styled from "styled-components";

export const Main = styled.ul`
    width: 100%;
    height: 100%;
    padding: 1em 0em;
    background-color: #ededed;
    overflow: auto;

    li {
    display: flex;
    padding: 0em .5em;
    margin-bottom: 1em;

    .day-marck{
        display: flex;
        flex-direction: column;
        margin-right: 1em;
        align-items: center;

        .day-title{
            font-size: 12px;
            font-weight: bold;
            margin-bottom: .2em;
        }

        .day-circle {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 100%;
            text-align: center;
            background-color: #ccc;
        }
    }

    .day-marck.active{
        .day-circle {
            background: var(--cor-main);
            color: #fff;
        }
            
    }


    .day-info{
        display: flex;
        width: 100%;
        background-color: #fff;
        padding: .5em;
        border-radius: 1em;
        gap: 1em;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

        .day-status{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            background-color: #85f885;
            border-radius: 100%;
        }

        .day-body{
            display: flex;
            flex-direction: column;
            gap: 1em;
            margin-bottom: .5em;
        }
    }
    }
`