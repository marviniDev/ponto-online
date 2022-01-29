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
            width: 35px;
            height: 35px;
            border-radius: 100%;
            text-align: center;
            background-color: #ccc;
            font-weight: 500;
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
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: #fff;
        padding: .5em 1em;
        border-radius: 1em;
        gap: 1em;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        position: relative;

        button{
            position: absolute;
            right: 1em;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 100%;
            text-align: center;
            background-color: var(--cor-main);
            font-weight: 500;
        }

        .day-status{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            background-color: #85f885;
            border-radius: 100%;
        }

        .day-body-flex{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: .5em;
            width: 100%;
        }

        .day-body{
            display: flex;
            gap: 1em;

            .card{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                border-radius: 0.3em;
                padding: 2em;
                color: #fff;
            }

            .card.sucess {
                background-color:#0db868;
            }

            .card.failed {
                background-color: #e25252;
            }
        }
    }
    }
`