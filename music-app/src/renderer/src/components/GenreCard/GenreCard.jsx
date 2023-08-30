import React from 'react'
import './GenreCard.css'
const GenreCard = ({title}) => {

  const pickRandomColor = (transparencia)=>{
    //Gera o numero aleatório entre 0 e 360
    let random = (Math.random() * 1000)
    let randomNumber = Math.floor((360 / 999) * random)
    while(randomNumber > 360){
      randomNumber = Math.floor(Math.random() * 10)
    }
    
    return {
      cor1: "hsla(" + randomNumber + ", 100%, 70%, " + transparencia + ")",
      cor2: "hsl(" + randomNumber + ", 100%, 70%)"
    }
  }

  const {cor1, cor2} = pickRandomColor(0.10)
  const genrecardContainer = {
    position: "relative",
    height: "40px",
    width: "200px",
    borderRadius: "5px",
    backgroundColor: cor1,
    border: "1px solid gray"
  }

  const genrecardDestaque = {
    position: "relative",
    height: "100%",
    width: "10px",
    backgroundColor: cor2
  }

  return (
    <div style={genrecardContainer}>
        <div style={genrecardDestaque}>
            <div className="genrecard-title">{title}</div>
        </div>
    </div>
  )
}

export default GenreCard