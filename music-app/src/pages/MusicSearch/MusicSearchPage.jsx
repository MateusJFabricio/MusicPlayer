import React, { useEffect, useState } from 'react'
import './MusicSearchPage.css'
import { useParams } from 'react-router-dom'

const MusicSearchPage = () => {
  const URL_API = "http://localhost:3000/"
  const {search}=useParams();
  const [musicResults, setMusicResults] = useState([])
  
  useEffect(() => {
      //Realiza a busca no banco de dados
      if (search.length > 0)
      {
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
      }
  
  }, [search])
  

  return (
    <>
      <div className='musicsearchpage-container'>
        <ul>
          {
            musicResults.map((music)=>(
              <li key={music._id}>Artista: {music.artist} - Nome: {music.name}</li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default MusicSearchPage