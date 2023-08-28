const express = require('express');
const app = express();
const mongoose = require('mongoose')

const debugMode = true

//Instalando CORS
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//Chamada das rotas
const musicRoutes = require('./routes/musicRoutes')
app.use('/music', musicRoutes)

const pesquisarRoutes = require('./routes/pesquisarRoutes')
app.use('/pesquisar', pesquisarRoutes)

const gerenciarRoutes = require('./routes/gerenciarRoutes')
app.use('/gerenciar', gerenciarRoutes)

//Rota inicial
app.get('/', (req, res) =>{
    res.json({
        message: 'Server running'
    })
})

if (debugMode) {
    mongoose.connect("mongodb://localhost:27017/geraldodb_dev")
    .then(()=>{
        console.log('App conectado ao banco de dados')
        app.listen(3000)
    })
    .catch((err)=>{
        console.log(err)
    })
}else{
    mongoose.connect("mongodb://localhost:27017/geraldodb")
    .then(()=>{
        console.log('App conectado ao banco de dados')
        app.listen(3000)
    })
    .catch((err)=>{
        console.log(err)
    })
}