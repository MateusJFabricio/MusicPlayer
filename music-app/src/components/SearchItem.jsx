import React, { useEffect, useState } from 'react'
import noteIcon from '../assets/noteicon.png'
import './SearchItem.css'

const SearchItem = ({music,mouseOverUp, handleClick}) => {
  const [mouseOver, setMouseOver] = useState(false)
  
  useEffect(() => {
    mouseOverUp(mouseOver)
  }, [mouseOver])
  
  return (
    <div 
      onMouseEnter={()=>setMouseOver(true)} 
      onMouseOut={()=>setMouseOver(false)} 
      onClick={()=>handleClick(music)}
      className={mouseOver?"search-item destaque":"search-item"}>
        <div 
          onMouseEnter={()=>setMouseOver(true)} 
          onMouseOut={()=>setMouseOver(false)}
          onClick={()=>handleClick(music)}
          className="search-item-musicname">{music.name}
        </div>
        <div 
          onMouseEnter={()=>setMouseOver(true)} 
          onMouseOut={()=>setMouseOver(false)} 
          onClick={()=>handleClick(music)}
          className="search-item-artist">{music.artist}
        </div>
        {/* <img className="search-item-image" alt="Capa" src={music.capa} /> */}
        <img 
          onMouseEnter={()=>setMouseOver(true)} 
          onMouseOut={()=>setMouseOver(false)}
          onClick={()=>handleClick(music)} 
          className="search-item-image" alt="Capa" src={noteIcon} 
        />
    </div>
  )
}

export default SearchItem