import React, { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
// import Loading from "../Loading";
import { Calendar, Menu, Timer } from "../../assets/Icons";
import MenuButton from "../React/Menus/MenuButton";
import MenuLeft from "../React/Menus/MenuLeft";
import MenuTop from "../React/Menus/MenuTop";
import { Container, FlexContent, Main } from "./style";

export interface layoutProps {
  children: ReactNode
}

const Layout: React.FC<layoutProps> = ({ children }): JSX.Element => {
  const [isMenuActive, setMenuActive] = useState(false);
  const location = useLocation()

  function click() {
    console.log("oi");
  }
  const menuTemplate = [
    {
      icon: Calendar,
      title: "Calendário",
      link: "/calendar"
    },
    {
      icon: Timer,
      title: "Bater ponto",
      link: "/registerTime"
    },
    {
      icon: Menu,
      title: "Menu",
      link: "",
      onClick: click
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
        <MenuButton template={menuTemplate} />
      </Container>
    </>
  );
}

export default Layout;
