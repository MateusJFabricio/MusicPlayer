import React, {useState} from 'react'
import './Keyboard.css'

const Keyboard = ({onClose}) => {
    const [inputValue, setInputValue] = useState("")
    const addInput = (letter)=>{
        setInputValue(value => value + letter)
    }
  return (
    <div>
        <div className='keyboard-container'>
            <div className="keyboardinput-container">
                <input className='keyboard-input' onChange={(e)=>setInputValue(e.target.value)} type="text" value={inputValue}/>
                <button className='keyboard-close' onClick={()=>onClose(inputValue)}>X</button>
            </div>
            <div className="keyboard-keys">
                <button onClick={(e)=>addInput(e.target.textContent)}>B</button>
                <button onClick={(e)=>addInput(e.target.textContent)}>R</button>
                <button onClick={(e)=>addInput(e.target.textContent)}>A</button>
            </div>
        </div>
    </div>
  )
}

export default Keyboard