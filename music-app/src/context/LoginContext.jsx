import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = ({children})=>{
    const [logged, setLogged] = useState(false)
    const [level, setLevel] = useState(1)

    return(
        <LoginContext.Provider value={{logged, setLogged, level, setLevel}}>
            {children}
        </LoginContext.Provider >
    )
}