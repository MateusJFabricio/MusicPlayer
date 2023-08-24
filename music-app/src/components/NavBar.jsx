import React, { useState } from "react";
import "./NavBar.css";
import Logo from "../assets/logo.png"
import SearchIcon from "../assets/search.png"
import SettingIcon from "../assets/settings.png"
import { useEffect } from "react";
import SearchItem from "./SearchItem";
import { useParams, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const URL_API = "http://localhost:3000/"

  const navigate = useNavigate()

  const [musicResults, setMusicResults] = useState([])
  const [inputSearchValue, setInputSearchValue] = useState()

  const handleChangeSearchInput = (value)=>{
      setInputSearchValue(value)

      //Realiza a busca no banco de dados
      if (value.length >= 3)
      {
        fetch(URL_API + "music/artist/search/" + value)
        .then(response => response.json())
        .then(data => {
          setMusicResults(data.slice(0, 3))
        })
      }else{
        setMusicResults([])
      }
  }

  const handleListedMusicClick = (music)=>{
    navigate("/musicsearch/id:" + music._id)
  }

  const handleLogoClick = ()=>{
    navigate("/")
  }
  const handleInputKeyDown = (e)=>{
    if(e.key === "Enter"){
      handleIRButton();
    }
  }
  const handleIRButton = ()=>{
    if (inputSearchValue && inputSearchValue.length > 0)
    {
      setInputSearchValue("")
      setMusicResults([])
      navigate("/musicsearch/search:" + inputSearchValue, {replace: true})
    }
  }

  const handleOnBlurInput = ()=>{
    setMusicResults([])
  }

  return (
    <div className="nav-bar">
      <div className="logo">
        <img onClick={handleLogoClick} className="logo-image" alt="Logo" src={Logo} />
        <span onClick={handleLogoClick}>GeraldoPlayer</span>
      </div>
      <div className="search-bar">
        <div className="search-bar-frame">
          <div className="search-bar-icon">
            <img alt="Search Icon" src={SearchIcon} />
          </div>
          <input
            onBlur={handleOnBlurInput}
            onChange={(e)=>handleChangeSearchInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            value={inputSearchValue||''} 
            className="search-bar-input" 
            type="text" 
            placeholder="Busque as suas musicas digitando aqui..."
          />
          <button className="botao-pesquisar" onClick={handleIRButton}>IR</button>
          <div className="search-suggestions">
            <ul>
              {
                musicResults.map((music)=>(
                  <li key={music._id}>
                    <SearchItem className="search-suggestions-item" music={music} handleClick={handleListedMusicClick}/>
                  </li>
                ))
              }
            </ul>
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