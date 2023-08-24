import React from 'react'
import './MusicDetails.css'
import noteIcon from "../../assets/noteIcon.png"

const MusicDetails = ({music}) => {
    if (!music){
        music = {
            name: "Selecione uma musica",
            artist: "",
            capa: noteIcon
        }
    }
  return (
    <div className="musicdetails-container">
        <div className="musicdetails-picturecontainer">
            <img className="musicdetails-picture" alt="Album" src={music.capa} />
        </div>
        <div className="musicdetails-infocontainer">
            <p>{music.name}</p>
            <p>{music.artist}</p>
        </div>
    </div>
  )
}

export default MusicDetails