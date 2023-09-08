import React, { useEffect, useState } from 'react'
import './SearchItem.css'

const SearchItem = ({type, data, mouseOverUp, handleClick}) => {
  const [mouseOver, setMouseOver] = useState(false)
 
  useEffect(() => {
    mouseOverUp(mouseOver)
  }, [mouseOver])

  return (
    <div 
      onMouseEnter={()=>setMouseOver(true)} 
      onMouseOut={()=>setMouseOver(false)} 
      onClick={()=>handleClick(data, type)}
      className={mouseOver?"search-item destaque":"search-item"}>
        <div 
          onMouseEnter={()=>setMouseOver(true)} 
          onMouseOut={()=>setMouseOver(false)}
          onClick={()=>handleClick(data, type)}
          className={type==='music' || type==='album'?"search-item-musicname":'hide'}>
            {data.name&&data.name}
        </div>
        <div 
          onMouseEnter={()=>setMouseOver(true)} 
          onMouseOut={()=>setMouseOver(false)} 
          onClick={()=>handleClick(data, type)}
          className={type==='music' || type==='album'?"search-item-artist":"hide"}>{data.artist}
        </div>
        <div 
          onMouseEnter={()=>setMouseOver(true)} 
          onMouseOut={()=>setMouseOver(false)} 
          onClick={()=>handleClick(data, type)}
          className={type==='artist'?"search-item-artist-upper":"hide"}>{data.artist}
        </div>
        <img 
          onMouseEnter={()=>setMouseOver(true)} 
          onMouseOut={()=>setMouseOver(false)}
          onClick={()=>handleClick(data, type)} 
          className="search-item-image" alt="Capa" src={data.image} 
        />
    </div>
  )
}

export default SearchItem