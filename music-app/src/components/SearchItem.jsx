import React from 'react'
import capa from '../assets/akon-album.jpg'
import './SearchItem.css'

const SearchItem = () => {
  return (
    <div className="search-item">
        <div className="search-item-musicname">Gangsta Bop</div>
        <div className="search-item-artist">Akon</div>
        <img className="search-item-image" alt="Capa" src={capa} />
    </div>
  )
}

export default SearchItem