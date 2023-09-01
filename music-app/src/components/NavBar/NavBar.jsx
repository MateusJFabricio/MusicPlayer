import React, { useState,useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import "./NavBar.css";
import Logo from "../../assets/logo.png"
import SearchIcon from "../../assets/search.png"
import SettingIcon from "../../assets/settings.png"
import ExploreIcon from "../../assets/explore.png"
import SearchItem from "./../SearchItem/SearchItem";

const NavBar = () => {
  const URL_API = "http://localhost:3000/"

  const navigate = useNavigate()
  const [btnExplorerMouseOver, setBtnExplorerMouseOver] = useState(false)
  const [musicResults, setMusicResults] = useState([])
  const [albunsResult, setAlbunsResult] = useState([])
  const [inputSearchValue, setInputSearchValue] = useState()
  const [suggestionItemMouseOver, setSuggestionItemMouseOver] = useState(false)

  const handleChangeSearchInput = (value)=>{
      setInputSearchValue(value)

      //Realiza a busca no banco de dados
      if (value.length >= 3)
      {
        fetch(URL_API + "music/name/search/" + value)
        .then(response => response.json())
        .then(data => {
          setMusicResults(data.slice(0, 3))
        })

        fetch(URL_API + "pesquisar/albuns/search/" + value)
        .then(response => response.json())
        .then(data => {
          setAlbunsResult(data.slice(0, 3))
        })
      }else{
        setMusicResults([])
        setAlbunsResult([])
      }
  }

  const handleListedMusicClick = (music)=>{
    navigate("/musicsearch/id:" + music._id)
    setMusicResults([])
    setAlbunsResult([])
  }
  const handleListedAlbumClick = (album)=>{
    navigate("/album/"+ album.name)
    setMusicResults([])
    setAlbunsResult([])
  }
  const handleLogoClick = ()=>{
    navigate("/")
    setMusicResults([])
    setAlbunsResult([])
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
      setAlbunsResult([])
      navigate("/musicsearch/search:" + inputSearchValue, {replace: true})
    }
  }

  const handleOnBlurInput = ()=>{
    if (!suggestionItemMouseOver)
    {
      setMusicResults([])
      setAlbunsResult([])
    }
  }

  const handleExploreClick = ()=>{
      setInputSearchValue("")
      setMusicResults([])
      setAlbunsResult([])
      navigate("/musicsearch/")
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
          <div className={musicResults.length > 0 || albunsResult.length > 0 ? "search-suggestions" : "search-suggestions hidden"}>
            <ul>
              {/* Map das musicas */}
              {musicResults.length > 0 ?(<li key="musicas">Musicas</li>):null}
              {
                musicResults.map((music)=>(
                  <li key={music._id}>
                    <SearchItem 
                      className="search-suggestions-item" 
                      music={music}
                      mouseOverUp = {setSuggestionItemMouseOver}
                      handleClick={handleListedMusicClick}
                    />
                  </li>
                ))
              }
              {/* Map dos albuns */}
              {albunsResult.length > 0 ? (<li key="albuns">Albuns</li>):null}
              {
                
                albunsResult.map((album, index)=>(
                  <li key={index}>
                    <SearchItem 
                      className="search-suggestions-item" 
                      album={album}
                      mouseOverUp = {setSuggestionItemMouseOver}
                      handleClick={handleListedAlbumClick}
                    />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className={btnExplorerMouseOver?"navbar-buttonexplorarcontainer on":"navbar-buttonexplorarcontainer"}
          onMouseEnter={()=>setBtnExplorerMouseOver(true)}
          onMouseLeave={()=>setBtnExplorerMouseOver(false)}
          >
          <img className="navbar-buttonexplorar-img" onClick={handleExploreClick} src={ExploreIcon} alt="img-explore" />
          <span className="navbar-buttonexplorar-text" onClick={handleExploreClick}>Explorar</span>
        </div>
        
      </div>
      <div className="nav-buttons">
        <img className="button-config" alt="Button config" src={SettingIcon} />
      </div>
    </div>
  );
};

export default NavBar;