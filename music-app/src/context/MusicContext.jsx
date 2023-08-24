import { createContext, useState } from "react";

export const MusicContext = createContext();

export const MusicContextProvider = ({children})=>{
    const [musicQueue, setMusicQueue] = useState([{id: 1, name: "musica 1"},{id: 1, name: "musica 1"},{id: 1, name: "musica 1"},{id: 1, name: "musica 1"},{id: 1, name: "musica 1"},{id: 1, name: "musica 1"},{id: 1, name: "musica 1"}, {id: 2, name: "musica 2"},{id: 3, name: "musica 2"},{id: 1, name: "musica 1"}, {id: 2, name: "musica 2"},{id: 3, name: "musica 2"},{id: 1, name: "musica 1"}, {id: 2, name: "musica 2"},{id: 3, name: "musica 2"},{id: 1, name: "musica 1"},])

    return(
        <MusicContext.Provider value={{musicQueue, setMusicQueue}}>
            {children}
        </MusicContext.Provider >
    )
}