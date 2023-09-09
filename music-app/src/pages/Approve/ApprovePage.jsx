import React, { useEffect, useContext, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ApprovePage.css'

import {LoginContext} from '../../context/LoginContext'
import { ApiContext } from "../../context/ApiContext";

import ShopItemDetails from "../../components/ShopItemDetails/ShopItemDetails";

const ApprovePage = () => {
  const {logged, level} = useContext(LoginContext)
  const {URL_API} = useContext(ApiContext)
  const navigate = useNavigate()
  const waitingApproveRef = useRef(false)
  const [waitingApprove, setWaitingApprove] = useState(waitingApproveRef.current)
  const [buyingList, setBuyingList] = useState([])
  const interval = useRef()
  
  useEffect(()=>{
    //Verifica a primeira vez
    fetch(URL_API.current + "buy/waiting_approve")
      .then(response => response.json())
      .then(data => {
        if (waitingApproveRef.current !== data.waitingApprove){
          waitingApproveRef.current = data.waitingApprove
          setWaitingApprove(waitingApproveRef.current)
        }
      })

    //Verifica se tem musica approvada
    interval.current = setInterval(() => { 
      fetch(URL_API.current + "buy/waiting_approve")
      .then(response => response.json())
      .then(data => {
        if (waitingApproveRef.current !== data.waitingApprove){
          waitingApproveRef.current = data.waitingApprove
          setWaitingApprove(waitingApproveRef.current)
        }
      })
    }, 4000);

  }, [])

  useEffect(()=>{
    if (waitingApprove){
      fetch(URL_API.current + "buy/songs")
      .then(response => response.json())
      .then(data => {
        setBuyingList(data)
      })
    }else{
      if (buyingList.length > 0){
        setBuyingList([])
      }
    }
  }, [waitingApprove])
  

  useEffect(()=>{
    if (!logged||level<2){
      navigate("/login/")
    }
  }, [logged, level])

  const handleBtnAprovarClick = ()=>{
    if (waitingApprove){
      fetch(URL_API.current + "buy/approve", {method: 'HEAD'})
        .catch()
      setBuyingList([])
      setWaitingApprove(false)
    }
  }
  const handleBtnReprovarClick = ()=>{
    if (waitingApprove){
      setBuyingList([])
      fetch(URL_API.current + "buy/clean", {method: 'HEAD'})
            .catch()
    }
  }
  return (
    <div className={"aprovepage-container"}>
      <div className={"aprovelist-container"}>
        <span className='approvelist-title'>Musicas pendentes</span>
        <div className="aprovelist-item">
          {
            waitingApprove&&
            buyingList.map((item, index)=>
            (<ShopItemDetails key={index} index={index} musica={item} showTrashBin={false}/>)) 
          }
        </div>
      </div>
      <div className="aprovelist-resumo">
        <span className='aprovelist-title'>Resumo da Compra</span>
        <span className="aprovelist-totalspan">Total: R$ {waitingApprove?new Intl.NumberFormat().format(buyingList.length * 1.55):"0,00"}</span>
        <button className='aprovelist-buttons aprovelist-aprovar' onClick={handleBtnAprovarClick}>Aprovar</button>
        <button className='aprovelist-buttons aprovelist-reprovar' onClick={handleBtnReprovarClick}>Reprovar</button>
      </div>
    </div>
  )
}

export default ApprovePage