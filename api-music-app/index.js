const express = require('express');
const app = express();
const mongoose = require('mongoose')
var bodyParser = require('body-parser');

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

app.use( bodyParser.json({limit: '50mb'}) );
app.use(express.json())

//Chamada das rotas
const musicRoutes = require('./routes/musicRoutes')
app.use('/music', musicRoutes)

const pesquisarRoutes = require('./routes/pesquisarRoutes')
app.use('/pesquisar', pesquisarRoutes)

const gerenciarRoutes = require('./routes/gerenciarRoutes')
app.use('/gerenciar', gerenciarRoutes)

const loginRoutes = require('./routes/loginRoutes')
app.use('/login', loginRoutes)

//Rota inicial
app.get('/', (req, res) =>{
    res.json({
        message: 'Server running - Debug mode'
    })
})

mongoose.connect("mongodb://localhost:27017/geraldodb_dev")
.then(()=>{
    console.log('Contected to dev database')
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
})