import styled from "styled-components";

export const Main = styled.section`
height: 100%;
    min-height: "100%";
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const Timing = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em auto;

p{
    position: absolute;
}
`
export const FloatingActions = styled.div`
    display: flex;

    button{
    padding: 1em;
    border-radius: .3em;
    width: 100%;
    }
`
export const ListPointScore = styled.ul`
    position: absolute;
    right: calc(100% - 85%);
    top: 34%;
`
