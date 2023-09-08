import React, { useState } from 'react'
import {MusicContext} from '../../context/MusicContext'
import { useContext } from 'react'
import MusicStackDetails from '../../components/MusicStackDetails/MusicStackDetails'
import './MenuLateral.css'

const MenuLateral = () => {
    let idList = 0;
    const {musicStack, setMusicStack} = useContext(MusicContext)

    return (
        <div className={musicStack.length > 0 ? "menulateral" : "menulateral hide"}>
            <div className="menulateral-queue-title">Sequência de Músicas</div>
            <ul className="menulateral-queue">{
                musicStack.map((music)=>{
                    idList++
                    return (
                        <li key={idList}>
                            <MusicStackDetails music={music}/>
                        </li>
                        )})
            }
            </ul>
        </div>
  )
}

export default MenuLateral