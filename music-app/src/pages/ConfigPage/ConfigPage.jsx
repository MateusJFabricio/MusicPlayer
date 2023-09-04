import React, {useRef, useState} from 'react'
import './ConfigPage.css'
import PickFile from '../../components/PickFile/PickFile'
import JsonViewEditor from '@uiw/react-json-view/editor';
import { lightTheme } from '@uiw/react-json-view/light';
import LoadingBar from 'react-top-loading-bar'
import imagem from '../../assets/akon-album.jpg'
import TreeView from '../../components/TreeView/TreeView';
const URL_API = "http://localhost:3000/"

const ConfigPage = () => {
  const [showPickFile, setShowPickFile] = useState(false)
  const [showJsonView, setShowJsonView] = useState(false)
  const [jsonImport, setJsonImport] = useState([])
  const [error, setError] = useState()
  const [file, setFile] = useState('')
  const [pendriveSelected, setPendriveSelected] = useState(false)
  const loadingBarRef = useRef(null);
  const origemPickFile = useRef('')
  const fileExtension = useRef([])
  const [albumInformation, setAlbumInformation] = useState({name: ''})

  const handlePickFileClick = (origem)=>{
    if (!showPickFile){
      setShowPickFile(true)
      origemPickFile.current = origem
      switch (origem) {
        case 'root':
          fileExtension.current = ['']
          break;
      
        default:
          break;
      }
    }
  }

  const handleClosePickFile = (result)=>{
    if (result.success){
      switch (origemPickFile.current) {
        case 'root':
          setFile(result.path)
          setPendriveSelected(result.pendriveSelected)
          origemPickFile.current = ''
          break;
        default:
          break;
      }
    }

    setShowPickFile(false)
  }
  const handleJsonEdit = (element)=>{
    let jsonHandle = jsonImport
    funcaoEditJson(jsonHandle, element.namespace, element.value)
    setJsonImport(jsonHandle)
  }

  const funcaoEditJson = (obj, path, newValue)=>{
    if (path.length > 1){
      funcaoEditJson(obj[path[0]], path.slice(1), newValue)
    }else{
      obj[path[0]] = newValue
    }

    return obj
  }

  const handleAutoImportClick = ()=>{
    const data = {
      path: file,
      source: pendriveSelected ? 'pendrive' : 'local'
    }
    loadingBarRef.current.continuousStart()
    fetch(URL_API + "gerenciar/autoimport", {
        method: "POST",
        body: JSON.stringify(data),
        mode:"cors",
        headers: {"Content-type":"application/json;charset=utf-8"}
    })
    .then(response => response.json())
    .then(data => {
        loadingBarRef.current.complete()
        if (data.error){
            setError(data.error)
            setJsonImport(data)
        }else{
            setError()
            setJsonImport(data.data)
        }
    })
  }

  const handleBtnViewJson = ()=>{
    if (!showJsonView){
      setShowJsonView(true)
    }else{
      setShowJsonView(false)
    }
  }

  const fetchTreeViewData = ()=>{
    return jsonImport.map((artista)=>{
      return {
        name: artista.artist,
        children: artista.albuns.map((album)=>{
          return {
            name: album.name
          }
        })
      }
    })
  }

  const handleTreeViewClicked = (data)=>{
    if (data.length === 2){
      const artista = jsonImport.find((artist)=>artist.artist === data[0])
      const album = artista.albuns.find((album)=>album.name === data[1])
      setAlbumInformation({
        name: album.name,
        artist: artista.artist,
        released: album.released,
        genres: album.genre.toString(),
        songs: album.songs
      })
    }
  }
  
  return (
    <div className='configpage-container'>
        <LoadingBar color="#f11946" ref={loadingBarRef}  shadow={true}/>
        <div className="autoimport-container">
          <div className="pageEdit">
            <div className="pendriveLocal">
              <button className={pendriveSelected?"btnSelected":null}>Pendrive</button>
              <button className={!pendriveSelected?"btnSelected":null}>Local</button>
            </div>
            <div className="diretorio">
              <span>Path:</span>
              <input value={file} onChange={null} type="text" className="inputDiretorio" readOnly="readonly" />
              <button className="btnSelectDir" onClick={()=>handlePickFileClick('root')}>Select Dir.</button>
              <button className="btnImport" onClick={handleAutoImportClick}>Auto-Import</button>
            </div>
            <button className={showJsonView?"btnViewJson btnSelected":"btnViewJson"} onClick={handleBtnViewJson}>View JSON</button>
            <button className="btnRun">SAVE</button>
          </div>
          <div className={!showJsonView?"columnsEdit":"columnsEditHidde"}>
            <div className="albunsContainer">
              <span>Artista</span>
                {jsonImport.mensagem ? null : <TreeView data={fetchTreeViewData()} onClick={handleTreeViewClicked}/>}
              <p>+</p> 
            </div>
            <div className="musicContainer">
              <span className='musicContainer-title'>Informações</span>
              <div className="informacaoEdit">
                <div className="informacaoEdit-left">
                  <div className="informacaoEdit-container">
                    <span>Nome:</span>
                    <input type="text" value={albumInformation.name} />
                  </div>
                  <div className="informacaoEdit-container">
                    <span>Artista:</span>
                    <input type="text" value={albumInformation.artist} />
                  </div>
                  <div className="informacaoEdit-container">
                    <span>Release:</span>
                    <input type="number" value={albumInformation.released}/>
                  </div>
                  <div className="informacaoEdit-container">
                    <span>Generos:</span>
                    <input type="text" value={albumInformation.genres}/>
                  </div>
                </div>
                <div className="informacaoEdit-right">
                  <img src={imagem} alt="Imagem do album" />
                </div>
              </div>
              <span className='musicContainer-title'>Musicas</span>
              <div className="musicList">
                <ul>
                  {
                    albumInformation.songs&&albumInformation.songs.map((song, index)=>(
                      <li key={index}>{song.name}</li>
                    ))
                  }
                </ul>
                <span className='buttonAddMusic'>+</span>
              </div>
            </div>

          </div>
          <div className="jsonView">
            {/* JSON VIEW */}
            {showJsonView&&
                <div className="jsonview">
                <JsonViewEditor 
                  onEdit={handleJsonEdit} 
                  value={jsonImport} 
                  style={lightTheme}/>
              </div>
            }
          </div>
        </div>
        {/* PICK FILE */}
        {showPickFile&&
          <div className="pickfile-container">
            <PickFile extension={fileExtension.current} onPickFile={handleClosePickFile}/>
          </div>
        }
    </div>
  )
}

export default ConfigPage