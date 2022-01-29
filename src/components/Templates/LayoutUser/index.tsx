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

const LayoutUser: React.FC<layoutProps> = ({ children }): JSX.Element => {
  const [isMenuActive, setMenuActive] = useState(false);
  const location = useLocation()

  function click() {
    console.log("oi");
  }
  const menuTemplate = [
    {
      icon: homeIcon,
      title: "Inicio",
      link: "/dashboard",
    },
    {
      icon: Timer,
      title: "Bater ponto",
      link: "/registerTime"
    },
    {
      icon: Calendar,
      title: "Calendário",
      link: "/calendar"
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

export default LayoutUser;
