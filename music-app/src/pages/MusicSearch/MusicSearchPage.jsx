import React, { useEffect, useState, useContext , useRef} from 'react'
import './MusicSearchPage.css'
import { useParams } from 'react-router-dom'
import MusicCard from '../../components/MusicCard/MusicCard'
import {MusicContext} from '../../context/MusicContext'
import Carrousel from '../../components/Carrousel/Carrousel'
import SearchTitle from '../../components/SearchTitle/SearchTitle'
import GenreCard from '../../components/GenreCard/GenreCard'
import LoadingBar from 'react-top-loading-bar'

const MusicSearchPage = () => {
  const URL_API = "http://localhost:3000/"
  const {search}=useParams();
  const {musicStack, setMusicStack} = useContext(MusicContext)
  const [searchMusicResults, setSearchMusicResults] = useState([])
  const [searchAlbunsResults, setSearchAlbunsResults] = useState([])
  const [searchAlbunsResults2, setSearchAlbunsResults2] = useState([])
  const [searchGenresResults, setSearchGenresResults] = useState([])
  const [searchGenreAlbunsResults, setSearchGenreAlbunsResults] = useState()
  const [searchArtistAlbunsResults, setSearchArtistAlbunsResults] = useState()
  const loadingBarRef = useRef(null);

  const buscaPorArtista = (artist)=>{
    if (artist)
    {
      loadingBarRef.current.continuousStart()
        fetch(URL_API + "music/artist/" + artist)
      .then(response => response.json())
      .then(data => {
        setSearchArtistAlbunsResults(data)
        setSearchGenreAlbunsResults()
        loadingBarRef.current.complete()
      })
    }
  }

  const buscaMusica = (id)=>{
    if (id)
    {
      loadingBarRef.current.continuousStart()
      fetch(URL_API + "music/" + id)
      .then(response => response.json())
      .then(data => {
        setSearchMusicResults(data)
        loadingBarRef.current.complete()
      })
    }
  }

  const buscarAlbuns = ()=>{
    loadingBarRef.current.continuousStart()
    fetch(URL_API + "pesquisar/albuns")
    .then(response => response.json())
    .then(data => {
      if (data.length > 10)
      {
        setSearchAlbunsResults(data.slice(0, 10))
        setSearchAlbunsResults2(data.slice(10))
      }else{
        setSearchAlbunsResults(data)
        setSearchAlbunsResults2()
      }
      
      loadingBarRef.current.complete()
    })
  }

  const buscarGeneros = ()=>{
    loadingBarRef.current.continuousStart()
    fetch(URL_API + "pesquisar/genres")
    .then(response => response.json())
    .then(data => {
      setSearchGenresResults(data)
      // setSearchArtistAlbunsResults()
      loadingBarRef.current.complete()
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

          //Se a musica inicia com artist
          if (search.startsWith("artist"))
          {
            const wordSearch  = search.substring(search.indexOf(":") + 1)
            buscaPorArtista(wordSearch)
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

  const buscarAlbunsGenero = (genre)=>{
    loadingBarRef.current.continuousStart()
    fetch(URL_API + "pesquisar/genres/" + genre)
    .then(response => response.json())
    .then(data => {
      setSearchGenreAlbunsResults(data)
      loadingBarRef.current.complete()
    })
  }

  const handleGenreClicked = (genre)=>{
    buscarAlbunsGenero(genre)
  }

  return (
    <div className="musicsearchpage-container">
            <LoadingBar color="#f11946" ref={loadingBarRef}  shadow={true}/>
            {/* Resultado da pesquisa */}
            {searchMusicResults.length > 0 ?<SearchTitle title="Musica selecionada"/>:null}
            {searchMusicResults.map((music, index)=>(
              <div className="musicsearchpage-musiclistcontainer">
                <MusicCard key={index} music={music}/>
              </div>
            ))}

            {/* Exibe os generos */}
            <SearchTitle title="Gêneros"/>
            <div className="genrescontainer">
              {searchGenresResults.map((genre, index)=>(
                <GenreCard key={index} title={genre} onClick={handleGenreClicked}/>
              ))}
            </div>

            {/* Exibe todos os albuns e restantes */}
            {searchGenreAlbunsResults&&<SearchTitle title={"10 Albuns do Genero: " + searchGenreAlbunsResults.genre}/>}
            {searchGenreAlbunsResults&&<Carrousel albuns={searchGenreAlbunsResults.albuns}/>}

            {searchArtistAlbunsResults&&<SearchTitle title={"Albuns do Artista: " + searchArtistAlbunsResults.artist}/>}
            {searchArtistAlbunsResults&&<Carrousel albuns={searchArtistAlbunsResults.albuns}/>}

            {searchAlbunsResults.length > 0 ?<SearchTitle title="Albuns"/>:null}
            {searchAlbunsResults.length > 0 ? <Carrousel albuns={searchAlbunsResults}/>:null}

            {searchAlbunsResults2.length > 0 ?<SearchTitle title="E mais albuns"/>:null}
            {searchAlbunsResults2.length > 0 ? <Carrousel albuns={searchAlbunsResults2}/>:null}

    </div>
  )
}

export default MusicSearchPage