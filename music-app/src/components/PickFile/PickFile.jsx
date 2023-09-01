import React, {useState, useEffect} from 'react'
import './PickFile.css'

const PickFile = ({extension, inicialFolder = '/', onPickFile}) => {
    const [path, setPath] = useState(inicialFolder)
    const [pendriveSelected, setPendriveSelected] = useState(false)
    const [files, setFiles] = useState([])
    const [error, setError] = useState()
    const URL_API = "http://localhost:3000/"

    const fetchFolder = (pendrive)=>{
        const data = {
            path: path,
            extension: extension,
            source: pendrive ? 'pendrive' : 'local'
        }
        fetch(URL_API + "gerenciar/map", {
            method: "POST",
            body: JSON.stringify(data),
            mode:"cors",
            headers: {"Content-type":"application/json;charset=utf-8"}
        })
        .then(response => response.json())
        .then(data => {
            if (data.error){
                setFiles([])    
                setError(data.error)
            }else{
                setFiles(data)
                if (error){
                    setError()
                }
            }
            console.log(data)
        })
    }
    useEffect(() => {
        if (path.endsWith('/')){
            fetchFolder(pendriveSelected)
        }
    }, [path])

    useEffect(() => {
        setPath("/")
        setFiles([])
        fetchFolder(pendriveSelected)
    }, [pendriveSelected])
    

    const handleSourceChanged = (pendrive)=>{
        setPendriveSelected(pendrive)
        setPath('/')
    }

    const handleFileDoubleClick = (file)=>{
        if (file.type === 'Directory'){
            setPath((actual)=>actual + file.name + "/")
        }else{
            if (!path.endsWith('/')){
                const newUrl = removeUltimoArquivoURL(path)
                setPath(newUrl + file.file)
            }else{
                setPath((actual)=>actual + file.file)
            }
        }
    }
    const handleUpFolder = ()=>{
        if (path !== '/'){
            setPath(removeUltimoArquivoURL(path))
        }
    }
    const removeUltimoArquivoURL = (dir)=>{
        let pathString = dir
        if (dir !== '/'){
            if (pathString.endsWith("/")){
                pathString = pathString.substring(0, pathString.lastIndexOf('/'))
            }

            pathString = pathString.substring(0, pathString.lastIndexOf('/') + 1)
        }
        return pathString
    }
  return (
    <div className='pickfile-container'>
        <div className="pickfile-topbuttons">
            <span>File Explorer</span>
            <button onClick={()=>handleSourceChanged(true)} className={pendriveSelected?"button-selected":""}>Pendrive</button>
            <button onClick={()=>handleSourceChanged(false)} className={!pendriveSelected?"button-selected":""}>Local</button>
        </div>
        <div className="pickfile-inputpath">
            <span>Path:</span>
            <input value={path} onChange={(e)=>setPath(e.target.value)} type="text"  />
        </div>
        <div className="pickfile-listfileitens">
            <ul>
                <li onDoubleClick={handleUpFolder}>../</li>
                {
                    files&&files.map((file, index)=>(<li key={index} onDoubleClick={() =>handleFileDoubleClick(file)}>{file.file}</li>))
                }
                {
                    error&&<li className='pickfile-listfileitens-error'>{error}</li>
                }
            </ul>
        </div>
        <div className="pickfile-bottonbuttons">
            <div className="bottonbuttons-leftside">
                <span>Extension:</span>
                <span>{extension}</span>
            </div>
            <div className="bottonbuttons-rightside">
                <button onClick={()=>onPickFile({success: false})} className="button-cancel">Cancelar</button>
                <button onClick={()=>onPickFile({success: true, path: path})} className="button-confirm">Confirmar</button>
            </div>
        </div>
    </div>
  )
}

export default PickFile