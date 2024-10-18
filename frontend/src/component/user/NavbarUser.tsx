import React from "react";
import "./navbar-user.css";
import LionLogo from "../../assets/Lion.jpg"
import Logo from "../../assets/LogoZoo.png";
import { Header } from "antd/es/layout/layout";
import { ShoppingCartSimple,UserCircle } from "phosphor-react";

const NavbarUser = () => {
  return (
    <Header style={{backgroundColor:"rgb(18, 22, 21)"}}>
      <div className="navbar-user">
        <img src={Logo} alt="" />
        <div className="about-zoo-user">About</div>
        <div className="ticket-user">Ticket</div>
        <div className="animal-user">Animal</div>
        <div className="shop-user">Shop</div>
        <div><ShoppingCartSimple size={38} /></div>
        <div><UserCircle size={38} /></div>
      </div>
    </Header>
  );
};

export default NavbarUser;
