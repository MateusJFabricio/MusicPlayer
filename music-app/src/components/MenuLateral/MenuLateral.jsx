import React, { useState } from 'react'
import {MusicContext} from '../../context/MusicContext'
import { useContext } from 'react'
import MusicQueueDetails from '../../components/MusicQueueDetails'
import './MenuLateral.css'

const MenuLateral = () => {
    let idList = 0;
    const {musicStack} = useContext(MusicContext)

    return (
        <div className="menulateral">
            <div className="menulateral-queue-title">Sequência de Músicas</div>
            <ul className="menulateral-queue">{
                musicStack.map((music)=>{
                    idList++
                    return (
                        <li key={idList}>
                        <MusicQueueDetails music={music}/>
                        </li>
                        )})
            }
            </ul>
        </div>
  )
}

export default MenuLateral