import React from 'react'
import './ShopItemDetails.css'
import TrashIcon from "../../assets/trash.png"
import MusicStackDetails from '../MusicStackDetails/MusicStackDetails'

const ShopItemDetails = ({index, musica, showTrashBin = true, onRemoveItem}) => {
  return (
    <div className='shopitem-container'>
        <MusicStackDetails music={musica}/>
        {showTrashBin?
        <div className="shopitem-btnRemove" onClick={()=>{onRemoveItem(index, musica)}}>
            <img src={TrashIcon} alt="Trash" />
        </div>:
        null}
    </div>
  )
}

export default ShopItemDetails