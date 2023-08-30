import React, { useEffect, useState } from 'react'
import noteIcon from '../assets/noteicon.png'
import './SearchItem.css'

const SearchItem = ({music, album, mouseOverUp, handleClick}) => {
  const [mouseOver, setMouseOver] = useState(false)
 
  useEffect(() => {
    mouseOverUp(mouseOver)
  }, [mouseOver])
  
  return (
    <div 
      onMouseEnter={()=>setMouseOver(true)} 
      onMouseOut={()=>setMouseOver(false)} 
      onClick={()=>handleClick(music||album)}
      className={mouseOver?"search-item destaque":"search-item"}>
        <div 
          onMouseEnter={()=>setMouseOver(true)} 
          onMouseOut={()=>setMouseOver(false)}
          onClick={()=>handleClick(music||album)}
          className="search-item-musicname">{(music||album).name}
        </div>
        <div 
          onMouseEnter={()=>setMouseOver(true)} 
          onMouseOut={()=>setMouseOver(false)} 
          onClick={()=>handleClick(music||album)}
          className="search-item-artist">{(music||album).artist}
        </div>
        {/* <img className="search-item-image" alt="Capa" src={music.capa} /> */}
        <img 
          onMouseEnter={()=>setMouseOver(true)} 
          onMouseOut={()=>setMouseOver(false)}
          onClick={()=>handleClick(music||album)} 
          className="search-item-image" alt="Capa" src={(music||album).image} 
        />
    </div>
  )
}

export default SearchItem