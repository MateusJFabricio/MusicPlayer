import './App.css'
import MediaBar from './components/MediaBar'
import MenuLateral from './components/MenuLateral/MenuLateral'
import NavBar from './components/NavBar'

//Rotas
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <>
      <div className='container'>
        <div className="pages">
          <Outlet/>
        </div>
        <MenuLateral/>
        <NavBar/>
        <MediaBar/>
      </div>
    </>
  )
}

export default App
