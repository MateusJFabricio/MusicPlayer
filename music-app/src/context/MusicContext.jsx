import { createContext, useState } from "react";

export const MusicContext = createContext();

export const MusicContextProvider = ({children})=>{
    const [musicStack, setMusicStack] = useState([])

    return(
        <MusicContext.Provider value={{musicStack, setMusicStack}}>
            {children}
        </MusicContext.Provider >
    )
}