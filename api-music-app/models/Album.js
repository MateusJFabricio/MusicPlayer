const mongoose = require('mongoose')

//Cria a tabela
const Albuns = mongoose.model('albuns',{
    name: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    released: {
      type: Number,
      required: true,
      min: 1000,
      max: 9999
    },
    genre: {
      type: [String],
      required: true
    },
    image: {
      type: String,
      required: true
    }
})

module.exports = { Albuns}