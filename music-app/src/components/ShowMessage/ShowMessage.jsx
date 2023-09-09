import React, {useState} from 'react'
import './ShowMessage.css'
const ShowMessage = ({Title, Message = '', type='Confirm', onResult}) => {
    const [mouseOverConfirmar, setMouseOverConfirmar] = useState(false)
    const [mouseOverCancelar, setMouseOverCancelar] = useState(false)
    const mensageArray = Message.split('\n')
  return (
    <div className="showmessage-blur">
        <div className='showmessage-container'>
            <div className='title-container'>{Title}</div>
            <div className='message-container'>{mensageArray.map((m, i)=>(<p key={i}>{m}</p>))}</div>
            <div className="button-container">
                <button className={mouseOverConfirmar?'btn btnConfirmar mouseOverConfirmar': 'btn btnConfirmar'} 
                onMouseEnter={()=>setMouseOverConfirmar(true)} 
                onMouseLeave={()=>setMouseOverConfirmar(false)} 
                onClick={()=>onResult('Confirm')}>Confirmar</button>
                {type === 'ConfirmCancel'?
                <button className={mouseOverCancelar?'btn btnCancelar mouseOverCancelar': 'btn btnCancelar'} 
                onMouseEnter={()=>setMouseOverCancelar(true)} 
                onMouseLeave={()=>setMouseOverCancelar(false)} 
                onClick={()=>onResult('Cancel')}>Cancelar</button>:null}
            </div>
        </div>
    </div>
  )
}

export default ShowMessage