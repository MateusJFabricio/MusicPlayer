import React, { useEffect, useState, useContext } from 'react'
import './MusicSearchPage.css'
import { useParams } from 'react-router-dom'
import MusicCard from '../../components/MusicCard/MusicCard'
import {MusicContext} from '../../context/MusicContext'
import Carrousel from '../../components/Carrousel/Carrousel'

const MusicSearchPage = () => {
  const URL_API = "http://localhost:3000/"
  const {search}=useParams();
  const [musicResults, setMusicResults] = useState([])
  const {musicStack, setMusicStack} = useContext(MusicContext)
  const [albuns, setAlbuns] = useState([])

  const buscaPorArtista = (artist)=>{
    if (artist)
    {
        fetch(URL_API + "music/artist/search/" + artist)
      .then(response => response.json())
      .then(data => {
        setMusicResults(data)
      })
    }
  }

  const buscaMusica = (id)=>{
    if (id)
    {
      fetch(URL_API + "music/" + id)
      .then(response => response.json())
      .then(data => {
        setMusicResults(data)
      })
    }
  }

  const buscarAlbuns = ()=>{
    fetch(URL_API + "pesquisar/albuns")
    .then(response => response.json())
    .then(data => {
      setAlbuns(data)
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
      }else{
        buscarAlbuns()
      }
      
  
  }, [search])
  
  // Adiciona musica no context
  const handleAddMusic = (music)=>{
    setMusicStack(stack => [...stack, music])
  }
  return (
    <div className="musicsearchpage-container">
        <Carrousel albuns={albuns}/>
    </div>
  )
  // return (
  //   <>
  //     <div className='musicsearchpage-container'>
  //       <ul>
  //         {
  //           musicResults.map((music)=>(
  //             <li key={music._id}>
  //               <MusicCard music={music} btnAddMusicOnClick={handleAddMusic}/>
  //             </li>
  //           ))
  //         }
  //       </ul>
  //     </div>
  //   </>
  // )
}

export default MusicSearchPage