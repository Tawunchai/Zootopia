import React from 'react';
import "./ZookeeperNav.css";
import Logo from "../../assets/LogoZoo.png";
import { Header } from "antd/es/layout/layout";
import { Ticket, UserCircle } from "phosphor-react";
import { Link } from "react-router-dom";

const NavbarZookeeper = () => {
  return (
    <Header style={{ backgroundColor: "rgb(18, 22, 21)" }}>
      <div className="navbar-zookeeper">
        <Link to="/"><img src={Logo} alt="" /></Link>
        <Link to="/create"><div className="animal-zookeeper">Animal</div></Link>
        <div className="about-zoo-zookeeper">Stock</div>
        <div className="about-zoo-zookeeper">Review</div>
        <div className="ticket-zookeeper">Event</div>
        <div className="icon"><Ticket size={32} /></div>
        <div className="icon"><UserCircle size={38} /></div>
      </div>
    </Header>
  )
}

export default NavbarZookeeper;
