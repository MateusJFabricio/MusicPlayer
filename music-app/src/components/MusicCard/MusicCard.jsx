import React from 'react'
import './MusicCard.css'

const MusicCard = ({music, btnAddMusicOnClick}) => {
  return (
    <div className='musiccard-container'>
        <p>Nome: {music.name}</p>
        <p>Artista: {music.artist}</p>
        <button onClick={()=>btnAddMusicOnClick(music)}>Adicionar Musica</button>
    </div>
  )
}

export default MusicCard