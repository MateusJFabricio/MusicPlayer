import React, { useEffect, useState } from 'react'
import akonAlbum from './../../../assets/akon-album.jpg'
import './CarrouselDetail.css'
import playIcon from '../../../assets/play.png'
import { useNavigate } from 'react-router-dom'

const CarrouselDetail = ({album, index}) => {
    const navigate = useNavigate()
    const [mouseOverImage, setMouseOverImage] = useState(false)
    useEffect(() => {
      if (!album){
        album = {
            artist: "No Artist",
            image: akonAlbum
        }
      }
    }, [])

    const handleAlbumMouseEnter = ()=>{
        setMouseOverImage(true)
    }
    const handleAlbumMouseLeave = ()=>{
        setMouseOverImage(false)
    }

    const handleMouseClicked = ()=>{
        navigate("/album/"+ album.name)
    }
    
  return (
    <div className='carrouseldetail'>
        <div className="carrouseldetail-image">
            <img className='albumPicture' onClick={handleMouseClicked} onMouseEnter={handleAlbumMouseEnter} onMouseLeave={handleAlbumMouseLeave}  src={album.image} alt="album"  />
            { mouseOverImage&&(<img onClick={handleMouseClicked} onMouseEnter={handleAlbumMouseEnter} onMouseLeave={handleAlbumMouseLeave} className='playPicture' src={playIcon} alt="play"/>)}
        </div>
        
        <div className='carrouseldetail-name'>{album.name}</div>
        <div className='carrouseldetail-artist'>{album.artist}</div>
    </div>
  )
}

export default CarrouselDetail