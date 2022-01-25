import styled from "styled-components";

export const MenuLeftContainer = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1300;
    visibility: hidden;
    opacity: 1;
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export const GenericDiv = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0,0,0,.5);
    touch-action: none;
    z-index: -1;
    opacity: 1;
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export const DrawerContainer = styled.div`
    background: #fff;
    position: absolute;
    left: 20%;
    transform: translate3d(0px, 0px, 0px);
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    right: 0;
    top: 0;
    bottom: 0;
`;

