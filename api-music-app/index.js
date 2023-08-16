const express = require('express');
const app = express();
const mongoose = require('mongoose')

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//Chamada das rotas
const musicRoutes = require('./routes/musicRoutes')
app.use('/music', musicRoutes)

//Rota inicial
app.get('/', (req, res) =>{
    res.json({
        message: 'Calma aí jovem que eu estou rodando sim'
    })
})

mongoose.connect("mongodb://localhost:27017/geraldodb")
.then(()=>{
    console.log('App conectado ao banco de dados')
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
})