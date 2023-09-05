import React, {useState} from 'react'
import './ShowMessage.css'
const ShowMessage = ({Title, Message = '', onResult}) => {
    const [mouseOver, setMouseOver] = useState(false)
    const mensageArray = Message.split('\n')
  return (
    <div className="showmessage-blur">
        <div className='showmessage-container'>
            <div className='title-container'>{Title}</div>
            <div className='message-container'>{mensageArray.map((m)=>(<p>{m}</p>))}</div>
            <div className="button-container">
                <button className={mouseOver?'btnConfirmar mouseOver': 'btnConfirmar'} 
                onMouseEnter={()=>setMouseOver(true)} 
                onMouseLeave={()=>setMouseOver(false)} 
                onClick={onResult}>Confirmar</button>
            </div>
        </div>
    </div>
  )
}

export default ShowMessage