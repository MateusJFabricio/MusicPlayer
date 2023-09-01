import React, {useState} from 'react'
import './LoginPage.css'
import { useParams, useNavigate } from 'react-router-dom'
const LoginPage = () => {
    const navigate = useNavigate()
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword ] = useState("")
    const [error, setError ] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault();
        setError("");

        const user = {
            displayName,
            password
        }
        //Executa a autenticacao

        //Se aceitar a autenticacao
        navigate("/configpage/")

        //senao
        // setError("Usuario ou senha incorretos")
    }

    return (
        <div className='loginpage-container'>
            <h1>Pagina de Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Usuario</span>
                    <input value={displayName} onChange={(e)=>setDisplayName(e.target.value)} type="text" name='displayName' required/>
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