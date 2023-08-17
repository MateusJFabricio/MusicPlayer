import React from 'react'
import './MainPage.css'
import MusicQueueDetails from '../../components/MusicQueueDetails'
import albumImage from '../../assets/akon-album.jpg'
const MainPage = () => {
  return (
        <div className='mainpage-container'>
            <div className="mainpage-lateral">
              <div className="mainpage-queue-title">Sequência de Músicas</div>
              <ul className="mainpage-queue">
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                <li>
                  <MusicQueueDetails/>
                </li>
                
              </ul>
            </div>
            <div className="mainpage-album-picture-container">
              <img className='mainpage-album-picture' src={albumImage} alt="Album Picture" />
            </div>
        </div>
    
  )
}

export default MainPage