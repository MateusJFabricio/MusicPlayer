import React, { useContext, useState } from 'react'
import './MusicCard.css'
import {MusicContext} from '../../context/MusicContext'
import addIcon from '../../assets/add.png'
const MusicCard = ({music}) => {
  const {musicStack, setMusicStack} = useContext(MusicContext)
  const [mouseOverButton, setMouseOverButton] = useState(false)
  // Adiciona musica no context
  const handleAddMusic = ()=>{
    setMusicStack(stack => [...stack, music])
  }

  return (
    <div className='musiccard-container'>
      <div className="musiccard-img">
        <img src={music.image} alt="music image" />
      </div>
      <div className='musiccard-musicname'>{music.name}</div>
      <div className='musiccard-artist'>{music.artist}</div>
      <div className={mouseOverButton?'musiccard-addbutton-on':'musiccard-addbutton'}
        onMouseEnter={()=>setMouseOverButton(true)} 
        onMouseLeave={()=>setMouseOverButton(false)} 
        onClick={handleAddMusic}>
        <img src={addIcon} alt="" />
      </div>
    </div>
  )
}

export default MusicCard