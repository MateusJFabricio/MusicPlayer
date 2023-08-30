import React from 'react'
import './MainPage.css'
import nomusic from '../../assets/nomusic.png'
import MusicQueueDetails from '../../components/MusicQueueDetails'
import {MusicContext} from '../../context/MusicContext'
import { useContext, useState, useEffect } from 'react'

const MainPage = () => {
  const [musicImage, setMusicImage] = useState()
  const {musicStack} = useContext(MusicContext)

  useEffect(() => {
    if (musicStack.length > 0){
      setMusicImage(musicStack[0].image)
    }else
    {
      setMusicImage(nomusic)
    }

  }, [musicStack])
  
  return (
        <div className='mainpage-container'>
            <div className="mainpage-album-picture-container">
              <img className='mainpage-album-picture' src={musicImage} alt="Album Picture" />
            </div>
        </div>
    
  )
}

export default MainPage