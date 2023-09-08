import React from 'react'
import './MusicDetails.css'
import noteIcon from "../../assets/noteicon.png"

const MusicDetails = ({music}) => {
    if (!music){
        music = {
            name: "Selecione uma musica",
            artist: "",
            image: noteIcon
        }
    }
  return (
    <div className="musicdetails-container">
        <div className="musicdetails-picturecontainer">
            <img className="musicdetails-picture" alt="Album" src={music.image} />
        </div>
        <div className="musicdetails-infocontainer">
            <p>{music.name}</p>
            <p>{music.artist}</p>
        </div>
    </div>
  )
}

export default MusicDetails