import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MusicSearchPage from './pages/MusicSearch/MusicSearchPage.jsx';
import AlbumListPage from './pages/AlbumList/AlbumListPage.jsx';

import {createBrowserRouter,RouterProvider} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage.jsx';
import {MusicContextProvider} from './context/MusicContext.jsx'

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
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)