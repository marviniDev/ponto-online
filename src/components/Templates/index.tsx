import React, { ReactNode, useState } from "react";
// import Loading from "../Loading";
import { Calendar, Menu, Timer } from "../../assets/Icons";
import MenuButton from "../React/Menus/MenuButton";
import MenuTop from "../React/Menus/MenuTop";
import { Container, FlexContent, Main } from "./style";

export interface layoutProps {
  children: ReactNode
}

const Layout: React.FC<layoutProps> = ({ children }): JSX.Element => {
  const [isMenuActive, setMenuActive] = useState(false);

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
        <MenuTop />
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