import React from "react";
import "./NavBar.css";
import Logo from "../assets/logo.png"
import SearchIcon from "../assets/search.png"
import SettingIcon from "../assets/settings.png"
import { useEffect } from "react";
import SearchItem from "./SearchItem";

const NavBar = () => {
  const URL_API = "http://localhost:3000/"

  
  useEffect(() => {
    
  });

  const handleChangeSearchInput = (value)=>{
    if(false){
      fetch(URL_API + "music/artist/search/" + value)
      .then(response => response.json())
      .then(data => console.log(data))
    }
  }

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
          <input onChange={(e)=>handleChangeSearchInput(e.target.value)} className="search-bar-input" type="text" placeholder="Busque as suas musicas digitando aqui..."/>
          <button className="botao-pesquisar">IR</button>
          <div className="search-suggestions">
            {/* <ul>
              <li>
                <SearchItem className="search-suggestions-item"/>
              </li>
              <li>
                <SearchItem className="search-suggestions-item"/>
              </li>
              <li>
                <SearchItem className="search-suggestions-item"/>
              </li>
              <li>
                <SearchItem className="search-suggestions-item"/>
              </li>
              <li>
                <SearchItem className="search-suggestions-item"/>
              </li>
              <li>
                <SearchItem className="search-suggestions-item"/>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
      <div className="nav-buttons">
        <img className="button-config" alt="Button config" src={SettingIcon} />
      </div>
    </div>
  );
};

export default NavBar;