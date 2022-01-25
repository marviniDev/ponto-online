import React, { ReactElement, ReactNode } from "react";
import { DrawerContainer, GenericDiv, MenuLeftContainer } from "./styles";

interface MenuLeftProps {
    children?: ReactNode,
    template?: {
        icon: string
        title: string
        link: string
    }[],
    body?: ReactElement<any, any> | Element | string
}

const MenuLeft: React.FC<MenuLeftProps> = (props): JSX.Element => {
    return (
        <MenuLeftContainer>
            <GenericDiv onClick={() => { console.log("clicou") }}>

            </GenericDiv>
            <DrawerContainer>

            </DrawerContainer>
        </MenuLeftContainer>
    )
}

export default MenuLeft
