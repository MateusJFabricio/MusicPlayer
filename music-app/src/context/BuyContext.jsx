import { createContext, useEffect, useState, useContext, useRef } from "react";
import { ApiContext } from "../context/ApiContext";
import {MusicContext} from '../context/MusicContext'
export const BuyContext = createContext();

export const BuyContextProvider = ({children})=>{
    const {URL_API} = useContext(ApiContext) 
    const {musicStack, setMusicStack} = useContext(MusicContext)
    const [buyingList, setBuyingList] = useState([])
    const [waitingApprove, setWaitingApprove] = useState(false)
    const interval = useRef()

    //Recupera as musicas pendentes de aprovação da API
    useEffect((()=>{
      fetch(URL_API.current + "buy/songs")
          .then(response => response.json())
          .then(data => {
            setBuyingList(data)
          })

      //Verifica se tem musica approvada
      interval.current = setInterval(() => { 
        fetch(URL_API.current + "buy/waiting_approve")
        .then(response => response.json())
        .then(data => {
          if (waitingApprove !== data.waitingApprove){
            setWaitingApprove(data.waitingApprove)
          }
        })
      }, 4000);

      // return clearInterval(interval.current);
    }), [])
    
    //Adiciona as musicas na API
    useEffect(() => {
      if (waitingApprove){
        fetch(URL_API.current + "buy/", {
            method: "POST",
            body: JSON.stringify(buyingList),
            mode:"cors",
            headers: {"Content-type":"application/json;charset=utf-8"}
        })
        .then(data =>{
          if (data.status === 200){
            setWaitingApprove(true)
          }
        })
        .catch()
      }else{
        if (buyingList.length > 0){
          fetch(URL_API.current + "buy/clean", {method: 'HEAD'})
          .catch()
        }
      }
    }, [waitingApprove])

    return(
        <BuyContext.Provider value={{buyingList, setBuyingList,waitingApprove, setWaitingApprove}}>
            {children}
        </BuyContext.Provider >
    )
}