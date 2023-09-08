import { createContext, useState, useEffect } from "react";

export const MusicContext = createContext();

export const MusicContextProvider = ({children})=>{
    const [stackLength, setStackLength] = useState(0)
    const [musicStack, setMusicStack] = useState([])
    const onMusicStackAdded = new Event("onMusicStackAdded"); 
    const onMusicStackRemoved = new Event("onMusicStackRemoved");

    //Stack Changed
    useEffect(() => {
        //Musica adicionada
        if (stackLength < musicStack.length)
        {
            document.dispatchEvent(onMusicStackAdded);
        }

        //Musica removida
        if (stackLength > musicStack.length)
        {
            document.dispatchEvent(onMusicStackRemoved);
        }

        setStackLength(musicStack.length)
        
    }, [musicStack])
    

    return(
        <MusicContext.Provider value={{musicStack, setMusicStack}}>
            {children}
        </MusicContext.Provider >
    )
}