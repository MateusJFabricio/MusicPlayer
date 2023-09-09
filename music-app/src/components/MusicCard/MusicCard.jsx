import React, { useContext, useState } from 'react'
import './MusicCard.css'
import {BuyContext} from '../../context/BuyContext'
import addIcon from '../../assets/add.png'
const MusicCard = ({music}) => {
  const {buyingList, setBuyingList, waitingApprove, setWaitingApprove} = useContext(BuyContext) 
  const [mouseOverButton, setMouseOverButton] = useState(false)
  // Adiciona musica no context
  const handleAddMusic = ()=>{
    if (!waitingApprove){
      setBuyingList(stack => [...stack, music])
    }
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