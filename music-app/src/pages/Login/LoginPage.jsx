import React, {useState, useContext, useEffect} from 'react'
import './LoginPage.css'
import { useParams, useNavigate } from 'react-router-dom'
import {LoginContext} from '../../context/LoginContext'

const URL_API = "http://localhost:3000/"

const LoginPage = () => {
    const navigate = useNavigate()
    const {logged, setLogged} = useContext(LoginContext)
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword ] = useState("")
    const [error, setError ] = useState("")

    useEffect(() => {
      if (logged){
        navigate("/configpage/")
      }
    }, [logged])
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        setError("");

        const user = {
            user: displayName,
            password
        }
        //Executa a autenticacao
        fetch(URL_API + "login/", {
            method: "POST",
            body: JSON.stringify(user),
            mode:"cors",
            headers: {"Content-type":"application/json;charset=utf-8"}
        })
        .then(response => response.json())
        .then(data => {
            if (data.error){
                setError(data.error)
            }else{
                setError()
                if (data.accepted){
                    setLogged(true)
                }else{
                    setError('Usuário e/ou senha incorreto')
                }
            }
        })
    }

    return (
        <div className='loginpage-container'>
            <h1>Pagina de Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Usuario</span>
                    <input value={displayName} onChange={(e)=>setDisplayName(e.target.value)} type="text" name='displayName' required  autoComplete='off'/>
                    <span>Senha</span>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name='password' required/>
                </label>
                <button className='btn'>Login</button>
                {error&& <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default LoginPage