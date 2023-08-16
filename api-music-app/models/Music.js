const mongoose = require('mongoose')

//Cria a tabela
const Music = mongoose.model('musicas',{
    nome: String,
    artista: String,
    album: String,
    released: Number,
    path: String,
    genero: String,
    img: { 
      data: Buffer, 
      contentType: String,
   }
})

const SCHEMA = {
    "id": "/Musica",
    "type": "object",
    "properties": {
      "album": {"type": "string"},
      "released": {"type": "integer", minLength: 4, maxLength: 4},
      "path": {"type": "string"},
      "name": {"type": "string"},
      "artist": {"type": "string"},
      "genre": {
        "type": "array", 
        "items": {"type":"string"}
      },
    },
    "required": ["album", "released", "mediaId", "name", "artist", "genre"]
  };

module.exports = { Music, SCHEMA}