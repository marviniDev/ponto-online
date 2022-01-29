import React, { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
// import Loading from "../Loading";
import { Calendar, homeIcon, Menu, Timer } from "../../../assets/Icons";
import MenuButton from "../../React/Menus/MenuButton";
import MenuLeft from "../../React/Menus/MenuLeft";
import MenuTop from "../../React/Menus/MenuTop";
import { Container, FlexContent, Main } from "./style";

export interface layoutProps {
  children: ReactNode
}

const LayoutAdmin: React.FC<layoutProps> = ({ children }): JSX.Element => {

  const menuTemplate = [
    {
      icon: "",
      title: "Inicio",
      link: "/admin/dashboard",
    },
    {
      icon: "",
      title: "Requisições",
      link: "/admin/requests"
    },
    {
      icon: "",
      title: "Usúarios",
      link: "/admin/users"
    }
  ]

  const menuTemplateTop = (
    <div>Menu</div>
  )

  return (
    <>
      <Container>
        <MenuLeft />
        <MenuTop body={"PH Motos"}>oi</MenuTop>
        <FlexContent>
          <Main>
            {children}
          </Main>
        </FlexContent>
        <MenuButton template={menuTemplate}/>
      </Container>
    </>
  );
}

export default LayoutAdmin;
