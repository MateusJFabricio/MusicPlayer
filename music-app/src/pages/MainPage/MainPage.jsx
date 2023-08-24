import React from 'react'
import './MainPage.css'
import albumImage from '../../assets/akon-album.jpg'
import MusicQueueDetails from '../../components/MusicQueueDetails'
import {MusicContext} from '../../context/MusicContext'
import { useContext } from 'react'

const MainPage = () => {
  const {musicQueue} = useContext(MusicContext)

  return (
        <div className='mainpage-container'>
            {/* <div className="mainpage-lateral">
              <div className="mainpage-queue-title">Sequência de Músicas</div>
              <ul className="mainpage-queue">{
                musicQueue.map((music)=>(
                  <li key={music.id}>
                    <MusicQueueDetails/>
                  </li>
                  ))}
                </ul>
            </div> */}
            <div className="mainpage-album-picture-container">
              <img className='mainpage-album-picture' src={albumImage} alt="Album Picture" />
            </div>
        </div>
    
  )
}

export default MainPage