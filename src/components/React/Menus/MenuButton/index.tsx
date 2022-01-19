import React, { ReactElement, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Button, ButtonFlex, Template } from "./styles";

interface MenuButtonProps {
    children?: ReactNode,
    template?: Array<{
        icon: string | React.FC | ReactElement
        title: string
        link: string
        onClick?: any
    }>
}

const MenuButton: React.FC<MenuButtonProps> = (props): JSX.Element => {
    return (
        <Template>
            <footer>
                {
                    props.template?.map((value, index) => {
                        return (
                            value.link ?
                                <Button key={index} >
                                    <NavLink to={value.link}>
                                        <ButtonFlex>
                                            {value.icon && <div className="button-flex icon">{value.icon}</div>}
                                            {value.title}
                                        </ButtonFlex>
                                    </NavLink>
                                </Button>
                                :
                                <Button key={index} onClick={() => {
                                    value.onClick()
                                }}>
                                    <ButtonFlex>
                                        {value.icon && <div className="button-flex icon">{value.icon}</div>}
                                        {value.title}
                                    </ButtonFlex>
                                </Button>
                        )
                    })
                }
            </footer>
        </Template>
    )
}

export default MenuButton
