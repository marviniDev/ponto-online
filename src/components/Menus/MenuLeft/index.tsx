import React, { ReactNode } from "react";

interface MenuLeftProps {
    children?: ReactNode,
    template: {
        icon: string
        title: string
        link: string
    }[]
}

const MenuLeft: React.FC<MenuLeftProps> = ({ children, template, ...rest }): JSX.Element => {
    return (
        <></>
    )
}

export default MenuLeft
