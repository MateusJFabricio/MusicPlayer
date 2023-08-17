import './App.css'
import MediaBar from './components/MediaBar'
import NavBar from './components/NavBar'
import MainPage from './pages/MainPage/MainPage'

function App() {

  return (
    <>
      <div className='container'>
        <div className="pages">
          <MainPage/>
        </div>
        <NavBar/>
        <MediaBar/>
      </div>
    </>
  )
}

export default App
