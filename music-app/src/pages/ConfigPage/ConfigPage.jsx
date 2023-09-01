import React, {useState} from 'react'
import './ConfigPage.css'
import PickFile from '../../components/PickFile/PickFile'

const ConfigPage = () => {
  const [showPickFile, setShowPickFile] = useState(false)
  const [file, setFile] = useState('')
  const handlePickFileClick = ()=>{
    if (!showPickFile){
      setShowPickFile(true)
    }
  }

  const handleClosePickFile = (result)=>{
    if (result.success){
      setFile(result.path)
    }else{
      setFile('')
    }

    setShowPickFile(false)
  }
  return (
    <div className='configpage-container'>
        <div className="autoimport-container">
          <button onClick={handlePickFileClick}>Pick File</button>
          <span>File: {file}</span>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
          <h1>Config Page</h1>
        </div>
        {showPickFile&&
          <div className="pickfile-container">
            <PickFile extension={['','.mp3', '.jpg']} onPickFile={handleClosePickFile}/>
          </div>
        }
    </div>
  )
}

export default ConfigPage