const mongoose = require('mongoose')

//Cria a tabela
const Music = mongoose.model('musicas',{
    name: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    album: {
      type: String,
      required: true
    },
    albumId: {
      type: String
    },
    released: {
      type: Number,
      required: true,
      min: 1900,
      max: 2100
    },
    genre: {
      type: [String],
      required: true
    },
    path: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
})

module.exports = { Music}