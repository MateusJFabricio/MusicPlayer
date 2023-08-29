import React, { useEffect, useState, useContext } from 'react'
import './AlbumListPage.css'
import { useParams } from 'react-router-dom'
import {MusicContext} from '../../context/MusicContext'
import MusicCard from '../../components/MusicCard/MusicCard'
import SearchTitle from '../../components/SearchTitle/SearchTitle'
import songsJson from './../../assets/remove_asap/music/musicas.json'

const AlbumListPage = () => {
  const URL_API = "http://localhost:3000/"
  const {albumName}=useParams();
  const [musicResults, setMusicResults] = useState([])
  const {musicStack, setMusicStack} = useContext(MusicContext)
  const buscaLocal = true

  useEffect(() => {
    if (buscaLocal){
      const albumResult = songsJson.filter((obj)=> obj.album == albumName)
      setMusicResults(albumResult)
      return
    }
    fetch(URL_API + "pesquisar/albuns/songs/" + albumName)
    .then(response => response.json())
    .then(data => {
      setMusicResults(data)
    })
  
  }, [albumName])
  
  // Adiciona musica no context
  const handleAddMusic = (music)=>{
    setMusicStack(stack => [...stack, music])
  }

  return (
    <>
      <div className='albumlist-container'>
        <div className="albumlist-titlecontainer">
          <div className="albumlist-imgtitle">
            <img src={musicResults[0]&&musicResults[0].image} alt="image title"/>
          </div>
          <div className="albumlist-info">
            <div className="albumlist-albumname">Album: {musicResults[0]&&musicResults[0].album}</div>
            <div className="albumlist-artistname">Artista: {musicResults[0]&&musicResults[0].artist}</div>
            <div className="albumlist-released">Lançamento: {musicResults[0]&&musicResults[0].released}</div>
          </div>
        </div>
        {musicResults.length > 0 ?
        <div className="albumlist-musiclistcontainer">
          {musicResults.length > 0 ?<SearchTitle title="Musicas"/>:null}
            {
              musicResults.map((music, index)=>(
                  <MusicCard key={index} music={music}/>
              ))
            }
        </div>:null}
      </div>
    </>
  )
}

export default AlbumListPage