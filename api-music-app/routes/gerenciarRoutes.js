const utils = require("../utils/utils")
const {Music} = require('../models/Music')
const {Albuns} = require('../models/Album')
const router = require('express').Router()
var fs = require('fs');
var pathRequire = require('path');
const { json } = require("express");
const USB_NAME = "RVNELVVTQg=="
const ROOT_USB = "Music" //Nunca comecar e nem finalizar com '/' ex: Music/artist1/album1
const ROOT_LOCAL = "C:/Music" //Nunca finalizar com '/' ex: C:/Music/albunsImport

router.post("/map", async (req, res)=>{
    try {
        let path = req.body['path']
        const extension = req.body['extension']
        const source = req.body['source']
        let fileSource = ''
        if (utils.CurrentOS() === 'win32')
        {
            fileSource = source === "pendrive" ? ROOT_USB : ROOT_LOCAL
        }else{
            throw new Error("This API just support Windows SO")
        }
        
        if (!path||!extension||!source){
            throw new Error("Parameter missed")
        }

        //Verifica path
        if (!path.endsWith("/")){
            path += "/"
        }
        //Verifica path
        if (!path.startsWith("/")){
            path = "/" + path
        }

        //Verifica se o pendrive esta montado caso necessario
        if (source.toLowerCase() === 'pendrive'){
            const mediaUsb = utils.SearchUSB(USB_NAME)
            if (mediaUsb.found){
                fileSource = mediaUsb.path + fileSource
            }else{
                throw new Error("Media USB wasn't found")
            }
        }
        
        const fullPath = fileSource + path

        const read = utils.ReadFolder(fullPath, extension)
        
        res.status(200).json(read)
    } catch (error) {
        res.status(500).json({
            error: error.message,
            format: "{ path: /temp, extension: .txt, source: pendrive|local}"
        })
    }
})

router.get("/loadpicture", async (req, res)=>{
    try {
        const path = req.body['path']
        let source = req.body['source']

        if (!path){
            throw new Error("Parameter \"path\" missed")
        }

        if (!source){
            throw new Error("Parameter \"source\" missed")
        }

        if (!path.endsWith(".mp3")){
            throw new Error("The name must end with .mp3")
        }

        //Determina o diretorio
        let fileSource = ''
        if (utils.CurrentOS() === 'win32')
        {
            fileSource = source.toLowerCase() === "pendrive" ? ROOT_USB : ROOT_LOCAL
        }else{
            throw new Error("This API just support Windows SO")
        }

        //Verifica se o pendrive esta montado caso necessario
        if (source === 'pendrive'){
            const mediaUsb = utils.SearchUSB(USB_NAME)
            if (mediaUsb.found){
                fileSource = mediaUsb.path + fileSource
            }else{
                throw new Error("Media USB wasn't found")
            }
        }
        const fullPath = fileSource + path
        
        res.status(200).json({image: utils.LoadPicture(fullPath)})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get("/loadMusic", async (req, res)=>{
    try {              
        const path = req.body['path']
        let source = req.body['source']

        if (!path){
            throw new Error("Parameter \"path\" missed")
        }

        if (!source){
            throw new Error("Parameter \"source\" missed")
        }

        if (!path.endsWith(".mp3")){
            throw new Error("The name must end with .mp3")
        }

        //Determina o diretorio
        let fileSource = ''
        if (utils.CurrentOS() === 'win32')
        {
            fileSource = source.toLowerCase() === "pendrive" ? ROOT_USB : ROOT_LOCAL
        }else{
            throw new Error("This API just support Windows SO")
        }

        //Verifica se o pendrive esta montado caso necessario
        if (source === 'pendrive'){
            const mediaUsb = utils.SearchUSB(USB_NAME)
            if (mediaUsb.found){
                fileSource = mediaUsb.path + fileSource
            }else{
                throw new Error("Media USB wasn't found")
            }
        }
        
        const fullPath = fileSource + path

        //Verifica se o arquivo existe
        if (!fs.existsSync(fullPath)){
            throw new Error("Arquivo inexistente. Lembre-se que o caminho deve ser relativo Ex: music/album/outrosalbuns")
        }

        res.download(path, 'music.mp3')
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Autoimport mapea uma pasta e retorna um JSON com a estrutura para salvar
router.get("/autoimport", async (req, res)=>{
    try {              
        const path = req.body['path']
        let source = req.body['source']

        if (!path){
            throw new Error("Parameter \"path\" missed")
        }

        if (!source){
            throw new Error("Parameter \"source\" missed")
        }

        //Determina o diretorio
        let fileSource = ''
        if (utils.CurrentOS() === 'win32')
        {
            fileSource = source.toLowerCase() === "pendrive" ? ROOT_USB : ROOT_LOCAL
        }else{
            throw new Error("This API just support Windows SO")
        }

        //Verifica se o pendrive esta montado caso necessario
        if (source === 'pendrive'){
            const mediaUsb = utils.SearchUSB(USB_NAME)
            if (mediaUsb.found){
                fileSource = mediaUsb.path + fileSource
            }else{
                throw new Error("Media USB wasn't found")
            }
        }
        
        const fullPath = fileSource + path

        //Executa o autoimport
        const artistFiles = utils.ReadFolder(fullPath)
        let albunsJson = {
                conflit: "showerror",
                source: source,
                data: null
            }
        albunsJson.data = artistFiles.map((artist)=>{

            const albunsFiles = utils.ReadFolder(artist.path)

            const albunsJson = albunsFiles.map((album)=>{
                const songsFiles = utils.ReadFolder(album.path, ['.mp3', '.jpg'])
                
                //Busca as imagens
                const imgFiles = songsFiles.filter((file)=>{
                    if (file.extension === '.jpg'){
                        return file
                    }
                })

                //Nenhuma imagem encontrada
                if (!imgFiles.find((img)=>img.file === 'cover.jpg')){
                    throw new Error("Image cover.jpg not found in " + album.path)
                }
                const coverFile = imgFiles.find((img)=>img.file === 'cover.jpg')
                const coverImg = utils.LoadPicture(coverFile.path)

                //Busca as musicas
                let songs = []
                songsFiles.forEach((song)=>{
                    if (song.extension === '.mp3')
                    {
                        //Busca uma imagem com o mesmo nome da musica
                        const songImg = imgFiles.find((img)=>img.name === song.name)

                        songs.push({
                            name: song.name,
                            file: song.file,
                            path: path + artist.name + "/" + album.name + "/" + song.file,
                            image: songImg ? utils.LoadPicture(songImg.path) : null
                        })
                    }
                })

                let released = 0
                let genre = []

                try{
                    const jsonPaths = utils.ReadFolder(album.path, ['.json'])
                    const jsonFile = jsonPaths.find((json)=>json.name === 'import')
                    if (jsonFile)
                    {
                        const jsonDescription = JSON.parse(fs.readFileSync(jsonFile.path))
                        released = jsonDescription['released']
                        genre = jsonDescription['genre']
                    }
                }catch(error){
                    throw new Error("Houve um error na leitura do JSON import. Erro: " + error.message + " Album: " + album.name)
                }
                
                return{
                    name: album.file,
                    released: released,
                    genre: genre,
                    songs: songs,
                    image: coverImg //utils.LoadPicture(coverImg.path)
                }
            })
            return{
                artist: artist.file,
                albuns: albunsJson
            }
        })
        
        res.status(200).json(albunsJson)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post("/save", (req, res)=>{
    try {
        const conflit = req.body['conflit']
        const data = req.body['data']
        const source = req.body['source']

        if (!conflit){
            throw new Error("Parameter \"conflit\" missed")
        }

        if (!data){
            throw new Error("Parameter \"data\" missed")
        }

        if (!source){
            throw new Error("Parameter \"source\" missed")
        }

        //Determina o diretorio
        let fileSource = ''
        if (utils.CurrentOS() === 'win32')
        {
            fileSource = source.toLowerCase() === "pendrive" ? ROOT_USB : ROOT_LOCAL
        }else{
            throw new Error("This API just support Windows SO")
        }

        //Verifica se o pendrive esta montado caso necessario
        if (source === 'pendrive'){
            const mediaUsb = utils.SearchUSB(USB_NAME)
            if (mediaUsb.found){
                fileSource = mediaUsb.path + fileSource
            }else{
                throw new Error("Media USB wasn't found")
            }
        }
        
        const fullPath = fileSource

        const analiseDadosAntesPost = async ()=>{
            //Verifica se o arquivo ja existe
            let fileErrorMessage = []
            try {    
                for await(artist of data){
                    for await(album of artist.albuns){
                        for await(song of album.songs){
                            //Verifica se o arquivo existe
                            if (conflit != 'skip'){
                                if (fs.existsSync(ROOT_LOCAL + "/"+ artist.artist +"/"+ album.name + "/"+  song.file)){
                                    fileErrorMessage.push("O arquivo [" + song.file + "] já existe na pasta de destino")
                                }

                                //Verifica se a musica ja esta no banco de dados
                                const music = await Music.findOne({
                                    name: song.name, 
                                    artist: artist.artist, 
                                    album: album.name
                                })
                
                                if (music){
                                    fileErrorMessage.push("A music [" + song.name + "]" + "do artista: [" + artist.artist + "] já esta cadastrada")
                                }
                            }

                        }
                    }
                }
    
                if (fileErrorMessage.length > 0){
                    throw new Error(fileErrorMessage.toString())
                }
            } catch (error) {
                throw new Error("Erro na verificacao. Erro: " + error.message)
            }
        }
        
        const moveArquivos = async ()=>{
            try{
                //copia os arquivos
                data.forEach((artist)=>{
                    artist.albuns.forEach((album)=>{
                        album.songs.forEach((song)=>{
                            //cria a pasta do artista
                            const folder = ROOT_LOCAL + "/" + artist.artist + "/" + album.name + "/"
                            const artistFolder = ROOT_LOCAL + "/" + artist.artist
                            const albumFolder = ROOT_LOCAL + "/" + artist.artist + "/" + album.name
                            if (!fs.existsSync(artistFolder)){
                                fs.mkdirSync(artistFolder, 0o777)
                            }

                            if (!fs.existsSync(albumFolder)){
                                fs.mkdirSync(albumFolder,0o777)
                            }
                            
                            if (!fs.existsSync(folder + song.file))
                            {
                                fs.copyFileSync(fullPath + song.path, folder + song.file, fs.constants.COPYFILE_EXCL)   
                            }else{
                                if(conflit != 'skip'){
                                    throw new Error('Aquivo ja existe: ' + song.file)
                                }
                            }
                        })
                    })
                })
    
                //monta os dados para salvar
                let jsonMusicSave = []
                let jsonAlbumSave = []
                data.forEach((artist)=>{
                    artist.albuns.forEach((album)=>{
                        //Monta o album
                        const albumJson = {
                            name: album.name,
                            released: album.released,
                            genre: album.genre,
                            artist: artist.artist,
                            image: album['image']
                        }

                        const result = new Albuns(albumJson).validateSync()
                        if (result){
                            throw new Error('problema na validacao do album pois -> ' + result)
                        }

                        jsonAlbumSave.push(albumJson)

                        //Monta a musica
                        album.songs.forEach((song)=>{
                            const albumFolder = ROOT_LOCAL + "/" + artist.artist + "/" + album.name
                            const musica = {
                                name: song.name,
                                artist: artist.artist,
                                album: album.name,
                                released: album.released,
                                genre: album.genre,
                                path: albumFolder + "/" + song.file,
                                image: song['image'] ? song['image'] : album['image']
                            }
                
                            //Validacao antes do post
                            const result = new Music(musica).validateSync()
                            if (result){
                                throw new Error('problema na validacao da musica pois -> ' + result)
                            }
        
                            jsonMusicSave.push(musica)
                        })
                        
                    })
                })

                //Salva os albuns
                if (jsonAlbumSave.length > 0){
                    const insertAlbunsResult = await Albuns.insertMany(jsonAlbumSave)
                    if (!insertAlbunsResult){
                        throw new Error('insert many Album error')
                    }
                }else{
                    throw new Error('Json para Insert Many do Album nao foi formado')
                }

                //salva os dados no BD
                if (jsonMusicSave.length > 0){
                    //Adiciona o ID do album
                    for await (const music of jsonMusicSave){
                        const album = await Albuns.findOne({artist: music.artist, name: music.album})
                        music.albumId = album._id
                    }
                    
                    const insertMusicResult = await Music.insertMany(jsonMusicSave)
                    if (!insertMusicResult){
                        throw new Error('insert many Music error')
                    }
                }else{
                    throw new Error('Json para Insert Many da musica nao foi formada')
                }
                
    
            }catch(error){
                throw new Error("Erro na decodificacao do JSON. Error:" + error.message)
            }
        }

        const executaPost = async ()=>{
            try{
                await analiseDadosAntesPost()
                await moveArquivos()
                res.status(200).json({message: 'done'})
            }catch(error){
                res.status(500).json({error: error.message})
            }
            
        }
        
        executaPost()
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
module.exports = router