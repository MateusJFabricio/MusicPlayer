import React from 'react'
import {MusicContext} from '../../context/MusicContext'
import { useContext } from 'react'
import MusicQueueDetails from '../../components/MusicQueueDetails'
import './MenuLateral.css'

const MenuLateral = () => {
    const {musicQueue} = useContext(MusicContext)

    return (
        <div className="menulateral">
            <div className="menulateral-queue-title">Sequência de Músicas</div>
            <ul className="menulateral-queue">{
            musicQueue.map((music)=>(
                <li key={music.id}>
                <MusicQueueDetails/>
                </li>
                ))}
            </ul>
        </div>
  )
}

export default MenuLateral