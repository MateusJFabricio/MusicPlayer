import React, { useState,useContext,useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import "./NavBar.scoped.css";

import {LoginContext} from '../../context/LoginContext'
import { ApiContext } from "../../context/ApiContext";
import { BuyContext } from "../../context/BuyContext";
import {MusicContext} from '../../context/MusicContext'

import Logo from "../../assets/logo.png"
import SearchIcon from "../../assets/search.png"
import SettingIcon from "../../assets/settings.png"
import ExploreIcon from "../../assets/explore.png"
import CartIcon from "../../assets/cart.png"

import SearchItem from "./../SearchItem/SearchItem";
import ShopItemDetails from "../ShopItemDetails/ShopItemDetails";
import ShowMessage from "../ShowMessage/ShowMessage";
import Keyboard from "../Keyboard/Keyboard";

const NavBar = () => {
  const navigate = useNavigate()

  const {URL_API} = useContext(ApiContext) 
  const {buyingList, setBuyingList, waitingApprove, setWaitingApprove} = useContext(BuyContext) 
  const {logged, setLogged, level, setLevel} = useContext(LoginContext)
  const {musicStack, setMusicStack} = useContext(MusicContext)

  const interval = useRef()
  const musicApprovedRef = useRef(false)
  const [musicApproved, setMusicApproved] = useState(false)

  const [btnExplorerMouseOver, setBtnExplorerMouseOver] = useState(false)
  const [showFloatMenuConfig, setShowFloatMenuConfig] = useState(false)
  const [showFloatMenuShopping, setShowFloatMenuShopping] = useState(false)
  const [musicResults, setMusicResults] = useState([])
  const [albunsResult, setAlbunsResult] = useState([])
  const [artistResult, setArtistResult] = useState([])
  const [inputSearchValue, setInputSearchValue] = useState()
  const [suggestionItemMouseOver, setSuggestionItemMouseOver] = useState(false)
  const [configButtonActive, setConfigButtonActive] = useState(false)
  const [showMessageCancelCompra, setShowMessageCancelCompra] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(false)

  useEffect(()=>{
    fetch(URL_API.current + "buy/approved")
      .then(response => response.json())
      .then(data => {
          setMusicApproved(data.approved)
      })
  }, [])

  const handleChangeSearchInput = (value)=>{
      setInputSearchValue(value)

      //Realiza a busca no banco de dados
      if (value.length >= 3)
      {
        fetch(URL_API.current + "music/name/search/" + value)
        .then(response => response.json())
        .then(data => {
          setMusicResults(data.slice(0, 3))
        })

        fetch(URL_API.current + "pesquisar/albuns/search/" + value)
        .then(response => response.json())
        .then(data => {
          setAlbunsResult(data.slice(0, 3))
        })

        fetch(URL_API.current + "pesquisar/artist/search/" + value)
        .then(response => response.json())
        .then(data => {
          setArtistResult(data.slice(0, 3))
        })
      }else{
        setMusicResults([])
        setAlbunsResult([])
        setArtistResult([])
      }
  }

  const handleListedMusicClick = (music)=>{
    navigate("/musicsearch/id:" + music._id)
    setMusicResults([])
    setAlbunsResult([])
    setArtistResult([])
  }

  const handleListedAlbumClick = (data)=>{
    navigate("/album/"+ data.name)
    setMusicResults([])
    setAlbunsResult([])
    setArtistResult([])
  }

  const handleListedArtistClick = (data)=>{
    navigate("/musicsearch/artist:"+ data.artist)
    setMusicResults([])
    setAlbunsResult([])
    setArtistResult([])
  }

  const handleLogoClick = ()=>{
    navigate("/")
    setMusicResults([])
    setAlbunsResult([])
    setArtistResult([])
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
      setArtistResult([])
      navigate("/musicsearch/search:" + inputSearchValue, {replace: true})
    }
  }

  const handleOnBlurInput = ()=>{
    if (!suggestionItemMouseOver)
    {
      setMusicResults([])
      setAlbunsResult([])
      setArtistResult([])
    }
  }

  const handleExploreClick = ()=>{
      setInputSearchValue("")
      setMusicResults([])
      setAlbunsResult([])
      setArtistResult([])
      navigate("/musicsearch/")
  }
  const handleConfigClick = ()=>{
    setShowFloatMenuShopping(false)
    setShowFloatMenuConfig(!showFloatMenuConfig)
    setConfigButtonActive(!showFloatMenuConfig)
  }
  const resetSearchComponents = ()=>{
    setInputSearchValue("")
    setMusicResults([])
    setAlbunsResult([])
    setArtistResult([])
    setShowFloatMenuConfig(false)
    setConfigButtonActive(false)
  }

  const handlebtnLoginClick = ()=>{
    resetSearchComponents()
    navigate("/login/")
  }

  const handlebtnLogoffClick = ()=>{
    resetSearchComponents()
    
    //Faz o logoff
    setLevel(1)
    setLogged(false)
  }

  const handlebtnAutoimportClick = ()=>{
    resetSearchComponents()
    navigate("/configpage/")
  }

  const handlebtnApproveClick = ()=>{
    resetSearchComponents()
    navigate("/approve/")
  }

  const handlebtnEditClick = ()=>{
    resetSearchComponents()
    navigate("/editpage/")
  }

  const handleCartClick = ()=>{
    setShowFloatMenuConfig(false)
    setConfigButtonActive(false)
    if (buyingList.length > 0){
      setShowFloatMenuShopping(!showFloatMenuShopping)
    }else{
      setShowFloatMenuShopping(false)
    }
  }

  const handleShoppingRemoveItem = (index, musica)=>{
    if (!waitingApprove){
      let list = buyingList
      list.splice(index, 1)
      setBuyingList([...list])
    }
  }

  const handleBtnConfirmaCompra = ()=>{
    if (waitingApprove){
      setShowMessageCancelCompra(true)
    }
    if (!waitingApprove){
      setWaitingApprove(true)
      checkMusicApproved()
    }
  }
  const handleShowMessageConfirm = (result)=>{
    setShowMessageCancelCompra(false)
    if (result === 'Confirm'){
      setWaitingApprove(false)
      cancelCheckMusicApproved()
    }
  }

  const checkMusicApproved = ()=>{
    //Verifica se tem musica approvada
    interval.current = setInterval(() => { 
      fetch(URL_API.current + "buy/approved")
      .then(response => response.json())
      .then(data => {
          setMusicApproved(data.approved)
      })
    }, 4000);
  }

  const cancelCheckMusicApproved = ()=>{
    clearInterval(interval.current)
  }

  useEffect(()=>{
    if (musicApproved){
      setMusicStack(stack=>[...stack, ...buyingList])
      setBuyingList([])
      setWaitingApprove(false)
      setMusicApproved(false)
      cancelCheckMusicApproved()
      fetch(URL_API.current + "buy/clean", {method: 'HEAD'})
        .catch()
    }

  }, [musicApproved])

  const handleKeyboardClose = (value)=>{
    setInputSearchValue(value)
    setShowKeyboard(false)
    handleChangeSearchInput(value)
  }
  return (
    <div className="nav-bar">
      <div className={logged?"loggedBar":null}></div>
      <div className="logo">
        <img onClick={handleLogoClick} className="logo-image" alt="Logo" src={Logo} />
        <span onClick={handleLogoClick}>GeraldoPlayer</span>
      </div>
      <div>
        <button onClick={()=>setShowKeyboard(value=>!value)}>Teclado</button>
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
          <div className={musicResults.length > 0 || albunsResult.length > 0 || artistResult.length > 0? "search-suggestions" : "search-suggestions hidden"}>
            <ul>
              {/* Map dos artistas */}
              {artistResult.length > 0 ? (<li key="artist">Artistas</li>):null}
              {
                
                artistResult.map((artist, index)=>(
                  <li key={index}>
                    <SearchItem 
                      className="search-suggestions-item"
                      type={'artist'}
                      data={artist}
                      mouseOverUp = {setSuggestionItemMouseOver}
                      handleClick={handleListedArtistClick}
                    />
                  </li>
                ))
              }
              {/* Map das musicas */}
              {musicResults.length > 0 ?(<li key="musicas">Musicas</li>):null}
              {
                musicResults.map((music)=>(
                  <li key={music._id}>
                    <SearchItem 
                      className="search-suggestions-item"
                      type={'music'}
                      data={music}
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
                      type={'album'}
                      data={album}
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
      <div className={showFloatMenuShopping&&buyingList.length > 0?"extrabuttons hover": "extrabuttons"} onClick={handleCartClick}>
        <img className="shoppingButton" src={CartIcon} alt="Shopping Button" />
        <span className={buyingList.length > 0?"shoppingButton-counter": "shoppingButton-counter hidden"}>{buyingList.length}</span>
      </div>
      <div className={showFloatMenuShopping&&buyingList.length > 0?"floatingmenushopping-container":"floatingmenushoping-container hidden"}>
        <div className="shoppingitem-container">
          {
            buyingList.map((item, index)=>
            (<ShopItemDetails key={index} index={index} musica={item} onRemoveItem={handleShoppingRemoveItem}/>)) 
          }
        </div>
        <div className="shoppingitembuttons-container">
          <span className="shopping-totalspan">Total: R$ {new Intl.NumberFormat().format(buyingList.length * 1.55)}</span>
          <button className="shopping-confirmacompra" 
            onClick={handleBtnConfirmaCompra}>
              {waitingApprove?"Aguardando Aprovação":"Comprar"}</button>
        </div>
        {showMessageCancelCompra&&<ShowMessage Title='Atenção' type="ConfirmCancel" onResult={handleShowMessageConfirm} Message="Deseja cancelar a compra?" />}
      </div>
      <div className={configButtonActive? "nav-buttons hover" : "nav-buttons"}
        onClick={handleConfigClick}>
        <img className="button-config" alt="Button config" src={SettingIcon} />
      </div>
      <div className={showFloatMenuConfig?"floatingmenu-container":"floatingmenu-container hidden"}>
        <button className="floatingmenu-item" onClick={handlebtnLoginClick}>Login</button>
        <button className="floatingmenu-item" onClick={handlebtnLogoffClick}>Logoff</button>
        <button className="floatingmenu-item" onClick={handlebtnAutoimportClick}>AutoImport</button>
        <button className="floatingmenu-item" onClick={handlebtnApproveClick}>Approve</button>
        <button className="floatingmenu-item" onClick={handlebtnEditClick}>Edit</button>
      </div>
      {showKeyboard&&<Keyboard onClose={handleKeyboardClose}/>}
    </div>
  );
};

export default NavBar;