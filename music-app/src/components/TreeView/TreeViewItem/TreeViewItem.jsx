import React, {useState, useEffect} from 'react'
import './TreeViewItem.css'
import ExpandirIcon from '../../../assets/expandir.png'
import ExpandidoIcon from '../../../assets/expandido.png'
const TreeViewItem = ({children, text, nivel, parent, onClick, collapse}) => {
    const [expand, setExpand] = useState(false)
    const [receivedParent, setReceivedParent] = useState([...parent, text])
    const [selected, setSelected] = useState(false)

    const handleItemClicked = ()=>{
        if (children){
            setExpand(!expand)
        }
        onClick(receivedParent)
        setSelected(!expand)
    }

    useEffect(()=>{
        if (collapse){
            setExpand(false)
        }
    }, [collapse])

    useEffect(() => {
        setReceivedParent([...parent, text])
    }, [text])
    

    const style = {
        width: (nivel * 10) + 'px'
    }
  return (
    <div>
        <div className='treeviewitem-container' onClick={handleItemClicked}>
            <div style={style}/>
            <img src={expand?ExpandidoIcon:ExpandirIcon} alt="expand" />
            <span className='treeviewitem-text'>{text}</span>
        </div>
        {expand&&children}
    </div>
  )
}

export default TreeViewItem