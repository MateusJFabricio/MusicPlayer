import React, { useEffect, useState, useContext } from 'react'
import './MusicSearchPage.css'
import { useParams } from 'react-router-dom'
import MusicCard from '../../components/MusicCard/MusicCard'
import {MusicContext} from '../../context/MusicContext'

const MusicSearchPage = () => {
  const URL_API = "http://localhost:3000/"
  const {search}=useParams();
  const [musicResults, setMusicResults] = useState([])
  const {musicStack, setMusicStack} = useContext(MusicContext)

  useEffect(() => {
      //Realiza a busca no banco de dados
      if (search.length > 0)
      {
        //Se a musica inicia com Search
        if (search.startsWith("search"))
        {
          const wordSearch  = search.substring(search.indexOf(":") + 1)
          if (wordSearch)
          {
              fetch(URL_API + "music/artist/search/" + wordSearch)
            .then(response => response.json())
            .then(data => {
              setMusicResults(data)
            })
          }
          
        }

        //Se a musica inicia com ID
        if (search.startsWith("id"))
        {
          const wordSearch  = search.substring(search.indexOf(":") + 1)
          if (wordSearch)
          {
            fetch(URL_API + "music/" + wordSearch)
            .then(response => response.json())
            .then(data => {
              setMusicResults(data)
            })
          }
        }

      }
  
  }, [search])
  
  // Adiciona musica no context
  const handleAddMusic = (music)=>{
    setMusicStack(stack => [...stack, music])
  }

  return (
    <>
      <div className='musicsearchpage-container'>
        <ul>
          {
            musicResults.map((music)=>(
              <li key={music._id}>
                <MusicCard music={music} btnAddMusicOnClick={handleAddMusic}/>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default MusicSearchPage