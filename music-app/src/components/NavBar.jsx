import React from "react";
import "./NavBar.css";
import Logo from "../assets/logo.png"
import SearchIcon from "../assets/search.png"
import SettingIcon from "../assets/settings.png"


const NavBar = () => {

  return (
    <div className="nav-bar">
      <div className="logo">
        <img className="logo-image" alt="Logo" src={Logo} />
        <span>GeraldoPlayer</span>
      </div>
      <div className="search-bar">
        <div className="search-bar-frame">
          <div className="search-bar-icon">
            <img alt="Search Icon" src={SearchIcon} />
          </div>
          <input className="search-bar-input" type="text" placeholder="Busque as suas musicas digitando aqui..."/>
        </div>
      </div>
      <div className="nav-buttons">
        <img className="button-config" alt="Button config" src={SettingIcon} />
      </div>
    </div>
  );
};

export default NavBar;