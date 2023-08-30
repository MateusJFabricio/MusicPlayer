import React from 'react'
import CarrouselDetail from './CarrouselDetail/CarrouselDetail'
import './Carrousel.css'


const Carrousel = ({albuns}) => {
  return (
    <div className='carrousel-container'>
        <div className='carrousel-slider'>
            {albuns.map((album, index)=>{
                return (<CarrouselDetail key={index} index={index} album={album}/>)
            })}
        </div>
    </div>
  )
}

export default Carrousel