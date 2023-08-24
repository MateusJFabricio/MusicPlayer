import { createContext, useState } from "react";

export const MusicContext = createContext();

export const MusicContextProvider = ({children})=>{
    //Remove isso depois pelo amor de Deus
    let umArrayPraAgora = []
    for(let i = 1; i <20; i++){
        const music = {
            id: i,
            nome: "Musica" + i
        }
        umArrayPraAgora.push(music)
    }

    const [musicQueue, setMusicQueue] = useState(umArrayPraAgora)

    return(
        <MusicContext.Provider value={{musicQueue, setMusicQueue}}>
            {children}
        </MusicContext.Provider >
    )
}