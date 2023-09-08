import './App.css'
import MediaBar from './components/MediaBar/MediaBar'
import MenuLateral from './components/MenuLateral/MenuLateral'
import NavBar from './components/NavBar/NavBar'

//Rotas
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <>
      <div className='container'>
        <div className="pages">
          <MenuLateral/>
          <Outlet/>
        </div>
        <NavBar/>
        <MediaBar/>
      </div>
    </>
  )
}

export default App
