import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {MusicContextProvider} from './context/MusicContext.jsx'
import {LoginContextProvider} from './context/LoginContext.jsx'
import { ApiContextProvider } from './context/ApiContext.jsx';
import { BuyContextProvider } from './context/BuyContext.jsx';

import MainPage from './pages/MainPage/MainPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import ConfigPage from './pages/ConfigPage/ConfigPage.jsx';
import MusicSearchPage from './pages/MusicSearch/MusicSearchPage.jsx';
import AlbumListPage from './pages/AlbumList/AlbumListPage.jsx';
import ApprovePage from './pages/Approve/ApprovePage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ApiContextProvider>
        <LoginContextProvider>
          <MusicContextProvider>
            <BuyContextProvider>
              <App/>
            </BuyContextProvider>
          </MusicContextProvider>
        </LoginContextProvider>
      </ApiContextProvider>
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
        element: (
            <LoginPage/>
        )
      },
      {
        path: "/configpage/",
        element: (
            <ConfigPage/>
        )
      },
      {
        path: "/approve/",
        element: (
            <ApprovePage/>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
