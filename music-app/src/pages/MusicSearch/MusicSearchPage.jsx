import React, { useEffect, useState, useContext } from 'react'
import './MusicSearchPage.css'
import { useParams } from 'react-router-dom'
import MusicCard from '../../components/MusicCard/MusicCard'
import {MusicContext} from '../../context/MusicContext'
import Carrousel from '../../components/Carrousel/Carrousel'
import SearchTitle from '../../components/SearchTitle/SearchTitle'
import GenreCard from '../../components/GenreCard/GenreCard'

const MusicSearchPage = () => {
  const URL_API = "http://localhost:3000/"
  const {search}=useParams();
  const {musicStack, setMusicStack} = useContext(MusicContext)
  const [searchMusicResults, setSearchMusicResults] = useState([])
  const [searchAlbunsResults, setSearchAlbunsResults] = useState([])
  const [searchGenresResults, setSearchGenresResults] = useState([])

  const buscaPorArtista = (artist)=>{
    if (artist)
    {
        fetch(URL_API + "music/artist/search/" + artist)
      .then(response => response.json())
      .then(data => {
        setSearchMusicResults(data)
      })
    }
  }

  const buscaMusica = (id)=>{
    if (id)
    {
      fetch(URL_API + "music/" + id)
      .then(response => response.json())
      .then(data => {
        setSearchMusicResults(data)
      })
    }
  }

  const buscarAlbuns = ()=>{
    fetch(URL_API + "pesquisar/albuns")
    .then(response => response.json())
    .then(data => {
      setSearchAlbunsResults(data)
    })
  }

  const buscarGeneros = ()=>{
    fetch(URL_API + "pesquisar/genres")
    .then(response => response.json())
    .then(data => {
      setSearchGenresResults(data)
    })
  }

  useEffect(() => {
      //Realiza a busca no banco de dados
      if (search){
        if (search.length > 0)
        {
          //Se a musica inicia com Search
          if (search.startsWith("search"))
          {
            const wordSearch  = search.substring(search.indexOf(":") + 1)
            buscaPorArtista(wordSearch)
          }

          //Se a musica inicia com ID
          if (search.startsWith("id"))
          {
            const wordSearch  = search.substring(search.indexOf(":") + 1)
            buscaMusica(wordSearch)
          }
        }
      }
      
      buscarAlbuns()
      buscarGeneros()
  }, [search])
  
  // Adiciona musica no context
  const handleAddMusic = (music)=>{
    setMusicStack(stack => [...stack, music])
  }
  return (
    <div className="musicsearchpage-container">
            {/* Resultado da pesquisa */}
            {searchMusicResults.length > 0 ?<SearchTitle title="Musica"/>:null}
            {searchMusicResults.map((music, index)=>(
              <div className="musicsearchpage-musiclistcontainer">
                <MusicCard key={index} music={music}/>
              </div>
            ))}
            {/* Exibe todos os albuns e restantes */}
            {searchAlbunsResults.length > 0 ?<SearchTitle title="Albuns"/>:null}
            {searchAlbunsResults.length > 0 ? <Carrousel albuns={searchAlbunsResults}/>:null}
            {/* Exibe os generos */}
            <SearchTitle title="Gêneros"/>
            <div className="genrescontainer">
              {searchGenresResults.map((genre, index)=>(
                <GenreCard key={index} title={genre}/>
              ))}
            </div>

    </div>
  )
}

export default MusicSearchPage