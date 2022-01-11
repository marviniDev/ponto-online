import { ReactNode } from "react";

interface MenuRightProps {
    children?: ReactNode,
    template: {
        icon: string
        title: string
        link: string
    }[]
}

const MenuRight: React.FC<MenuRightProps> = ({ children, template, ...rest }: MenuRightProps): JSX.Element => {
    return (
        <></>
    )
}

export default MenuRight
