import React, {useState, useRef, createRef} from 'react'
import './Keyboard.css'

const Keyboard = ({inputRef, onClose, onChange}) => {
    const divRef = createRef()
    const [upperCase, setUpperCase] = useState(false)
    const [style, setStyle] = useState({
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        borderRadius: '10px',
        top: (window.innerHeight / 2 - 200) +'px',
        left:(window.innerWidth / 2 - 400) +'px',
        backgroundColor: 'rgba(128, 128, 128, 0.68)'
    })
    const dragEnable = useRef(false)
    const clickPosition = useRef({x: 0, y: 0})
    const addLetterRef = (word)=>{
        if (!inputRef){
            return
        }

        if (word === '<--')
        {
            if (inputRef.current.value.length > 0){
                inputRef.current.value = inputRef.current.value.substring(0, inputRef.current.value.length - 1)
            }
        }

        if (word.toLowerCase() === 'clear')
        {
            inputRef.current.value = ''
        }
        
        if (word.toLowerCase() === 'caps')
        {
            setUpperCase(value=>!value)
        }

        if (word === '|___|')
        {
            inputRef.current.value += ' '
        }

        if (word.length === 1){
            inputRef.current.value += word
        }
        onChange()
    }

    const handleMouseMove = (e)=>{
        if (dragEnable.current){
            const x = Number(style.left.replace("px", ""));
            const y = Number(style.top.replace("px", ""));
            setStyle(
                {
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                borderRadius: '10px',
                top: y + e.movementY + "px",
                left: x + e.movementX + "px",
                backgroundColor: 'rgba(128, 128, 128, 0.68)'
            })
        }
    }
    const handleDoubleClick = (e)=>{
        clickPosition.current = {
            x: e.clientX,
            y: e.clientY
        }
        dragEnable.current = true
    }
    return (
    <div ref={divRef}
        style={style} 
        onMouseDown={handleDoubleClick}
        onMouseUp={()=>dragEnable.current = false}
        onMouseLeave={()=>dragEnable.current = false}
        onMouseMove={handleMouseMove}>
        <div className='keyboardinputContainer'>
            <span>Teclado Virtual</span>
            <button className='extendedkey close' onClick={onClose}>Close</button>
        </div>
        <div className='keyboardKeys'>
            <div className="line">
                <button className='regularkey' onClick={(e)=>addLetterRef(e.target.innerText)}>1</button>
                <button className='regularkey' onClick={(e)=>addLetterRef(e.target.innerText)}>2</button>
                <button className='regularkey' onClick={(e)=>addLetterRef(e.target.innerText)}>3</button>
                <button className='regularkey' onClick={(e)=>addLetterRef(e.target.innerText)}>4</button>
                <button className='regularkey' onClick={(e)=>addLetterRef(e.target.innerText)}>5</button>
                <button className='regularkey' onClick={(e)=>addLetterRef(e.target.innerText)}>6</button>
                <button className='regularkey' onClick={(e)=>addLetterRef(e.target.innerText)}>7</button>
                <button className='regularkey' onClick={(e)=>addLetterRef(e.target.innerText)}>8</button>
                <button className='regularkey' onClick={(e)=>addLetterRef(e.target.innerText)}>9</button>
                <button className='regularkey' onClick={(e)=>addLetterRef(e.target.innerText)}>0</button>
                <button className='extendedkey' onClick={(e)=>addLetterRef(e.target.innerText)}>{"<--"}</button>
            </div>
            <div className="line">
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>q</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>w</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>e</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>r</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>t</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>y</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>u</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>i</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>o</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>p</button>
            </div>
            <div className="line">
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>a</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>s</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>d</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>f</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>g</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>h</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>j</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>k</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>l</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>ç</button>
            </div>
            <div className="line">
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>z</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>x</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>c</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>v</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>b</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>n</button>
                <button className={upperCase?'regularkey uppercase':'regularkey'} onClick={(e)=>addLetterRef(e.target.innerText)}>m</button>
            </div>
            <div className="line">
            <button className='extendedkey' onClick={(e)=>addLetterRef(e.target.innerText)}>CAPS</button>
                <button className='superextendedkey' onClick={(e)=>addLetterRef(e.target.innerText)}>|___|</button>
                <button className='extendedkey' onClick={(e)=>addLetterRef(e.target.innerText)}>Clear</button>
                <button className='extendedkey' onClick={(e)=>addLetterRef(e.target.innerText)}>{"<"}</button>
                <button className='extendedkey' onClick={(e)=>addLetterRef(e.target.innerText)}>{">"}</button>
            </div>
        </div>
    </div>
  )
}

export default Keyboard