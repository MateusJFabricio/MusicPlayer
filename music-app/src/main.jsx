import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MusicSearchPage from './pages/MusicSearch/MusicSearchPage.jsx';
import AlbumListPage from './pages/AlbumList/AlbumListPage.jsx';

import {createBrowserRouter,RouterProvider} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage.jsx';
import {MusicContextProvider} from './context/MusicContext.jsx'
import LoginPage from './pages/Login/LoginPage.jsx';
import ConfigPage from './pages/ConfigPage/ConfigPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MusicContextProvider>
        <App/>
      </MusicContextProvider>
      ),
    children:[
      {
        path: "/",
        element: <MainPage/>
      },
      {
        path: "/musicsearch/",
        element: <MusicSearchPage/>
      },
      {
        path: "/musicsearch/:search",
        element: <MusicSearchPage/>
      },
      {
        path: "/album/:albumName",
        element: <AlbumListPage/>
      },
      {
        path: "/login/",
        element: <LoginPage/>
      },
      {
        path: "/configpage/",
        element: <ConfigPage/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
