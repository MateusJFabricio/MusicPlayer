import React, {useEffect, useRef, useState, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import './ConfigPage.css'
import PickFile from '../../components/PickFile/PickFile'
import JsonViewEditor from '@uiw/react-json-view/editor';
import { lightTheme } from '@uiw/react-json-view/light';
import LoadingBar from 'react-top-loading-bar'
import addIcon from '../../assets/add.png'
import TreeView from '../../components/TreeView/TreeView';
import {LoginContext} from '../../context/LoginContext'
import ShowMessage from '../../components/ShowMessage/ShowMessage';
const URL_API = "http://localhost:3000/"

const ConfigPage = () => {
  const {logged, level} = useContext(LoginContext)
  const navigate = useNavigate()
  const [showPickFile, setShowPickFile] = useState(false)
  const [showJsonView, setShowJsonView] = useState(false)
  const [collapse, setCollapse] = useState(false)
  const [jsonImport, setJsonImport] = useState([])
  const [error, setError] = useState()
  const [mensagem, setMensagem] = useState()
  const [file, setFile] = useState('')
  const [pendriveSelected, setPendriveSelected] = useState(false)
  const loadingBarRef = useRef(null);
  const origemPickFile = useRef('')
  const fileExtension = useRef([])
  const [albumInformation, setAlbumInformation] = useState({})
  const treeViewItemData = useRef()
  

  useEffect(()=>{
    if (!logged||level<5){
      navigate("/login/")
    }
  }, [logged, level])
  
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
    treeViewItemData.current = null
    setAlbumInformation({})
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

  const fetchImage = async (data)=>{

    const image = await fetch(URL_API + "gerenciar/loadpicture", {
      method: "POST",
      body: JSON.stringify(data),
      mode:"cors",
      headers: {"Content-type":"application/json;charset=utf-8"}
    })
    .then(response => response.json())
    .then(data => {
        return data.image
    })

    setAlbumInformation(album => ({
      name: album.name,
      artist: album.artist,
      released: album.released,
      genres: album.genres,
      songs: album.songs,
      image: image
    }))
  }

  const handleBtnViewJson = ()=>{
    if (!showJsonView){
      setShowJsonView(true)
      setCollapse(false)
    }else{
      setShowJsonView(false)
      setCollapse(true)
      treeViewItemData.current = null
      setAlbumInformation({})
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
      treeViewItemData.current = data
      loadDataToField(data)
    }else{
      treeViewItemData.current = null
      setAlbumInformation({})
    }
  }
  
  const loadDataToField = (data)=>{
    const artista = jsonImport.find((artist)=>artist.artist === data[0])
    const album = artista.albuns.find((album)=>album.name === data[1])
    fetchImage({
      path: album.image,
      source: pendriveSelected ? 'pendrive': 'local'
    })
    setAlbumInformation({
      name: album.name,
      artist: artista.artist,
      released: album.released,
      genres: album.genre.toString(),
      songs: album.songs
    })
  }

  const handleSaveClick = ()=>{
    loadingBarRef.current.continuousStart()
    fetch(URL_API + "gerenciar/save", {
        method: "POST",
        body: JSON.stringify({
            conflit: 'show',
            data: jsonImport,
            source: pendriveSelected ? 'pendrive' : 'local'
          }),
        mode:"cors",
        headers: {"Content-type":"application/json;charset=utf-8"}
    })
    .then(response => response.json())
    .then(data => {
        loadingBarRef.current.complete()
        if (data.error){
          setError(data.error)
        }else{
          setMensagem(data.message)
        }
    })
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
            <button className="btnRun" onClick={handleSaveClick}>SAVE</button>
          </div>
          <div className={!showJsonView?"columnsEdit":"columnsEditHidde"}>
            <div className="albunsContainer">
              <span>Artista</span>
                {jsonImport.mensagem ? null : <TreeView data={fetchTreeViewData()} onClick={handleTreeViewClicked} collapse={collapse}/>}
            </div>
            <div className="musicContainer">
              <span className='musicContainer-title'>Informações</span>
              <div className="informacaoEdit">
                <div className="informacaoEdit-left">
                  <div className="informacaoEdit-container">
                    <span>Nome:</span>
                    <input type="text" value={albumInformation.name?albumInformation.name:''} readOnly="readonly"/>
                  </div>
                  <div className="informacaoEdit-container">
                    <span>Artista:</span>
                    <input type="text" value={albumInformation.artist?albumInformation.artist:''} readOnly="readonly" />
                  </div>
                  <div className="informacaoEdit-container">
                    <span>Release:</span>
                    <input type="number" value={albumInformation.released?albumInformation.released:''} readOnly="readonly"/>
                  </div>
                  <div className="informacaoEdit-container">
                    <span>Generos:</span>
                    <input type="text" value={albumInformation.genres?albumInformation.genres:''} readOnly="readonly"/>
                  </div>
                </div>
                <div className="informacaoEdit-right">
                  {!albumInformation.image ? <img src={addIcon} alt="Imagem do album" /> :
                  <img src={albumInformation.image?albumInformation.image:null} alt="Imagem do album" />}
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
        {/* Show message */}
        {error&&<ShowMessage Title={'Houve um erro:'} Message={error} onResult={()=>setError()}/>}
        {mensagem&&<ShowMessage Title={'Mensagem'} Message={mensagem} onResult={()=>setMensagem()}/>}
    </div>
  )
}

export default ConfigPage