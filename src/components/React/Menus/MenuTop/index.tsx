import React, { ReactElement, ReactNode } from "react";
import { MenuTopContainer } from "./styles";

interface MenuTopProps {
    children?: ReactNode,
    template?: {
        icon: string
        title: string
        link: string
    }[],
    body?: ReactElement<any, any> | Element | string
}

const MenuTop: React.FC<MenuTopProps> = (props): JSX.Element => {
    return (
        <MenuTopContainer>
            {props.body || props.children}
        </MenuTopContainer>
    )
}

export default MenuTop
