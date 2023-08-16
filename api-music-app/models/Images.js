const mongoose = require('mongoose')

//Cria a tabela
const Image = mongoose.model('images',{
    music_id: String,
    img: { 
      data: Buffer, 
      contentType: String,
   }
})

module.exports = { Image}