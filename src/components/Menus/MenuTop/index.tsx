import React, { ReactElement, ReactNode } from "react";
import { TopBar } from "./styles";

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
        <TopBar>
            {
                props.body && props.body
            }
        </TopBar>
    )
}

export default MenuTop
