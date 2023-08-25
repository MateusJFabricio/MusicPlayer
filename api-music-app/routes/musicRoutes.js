const utils = require("../utils/utils")
const {Music} = require('../models/Music')
const router = require('express').Router()
var fs = require('fs');

router.get("/", async (req, res)=>{
    try {
        const musics = await Music.find();
        res.status(200).json(musics)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get("/loadMusic/:id", async (req, res)=>{
    try {              
        const id = req.params.id
        const music = await Music.findOne({_id: id});

        if (music.length === 0)
        {
            throw new Error("Id not found. ID: " + id);
        }
        res.download(music.path, 'music.mp3')
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get("/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const music = await Music. find({_id: id});

        if (music.length === 0)
        {
            throw new Error("Id not found. ID: " + id);
        }

        res.status(200).json(music)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get("/name/:name", async (req, res)=>{
    try {
        const name = req.params.name
        const music = await Music.find({name: name});

        res.status(200).json(music)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get("/name/search/:name", async (req, res)=>{
    try {
        const name = req.params.name
        const regex = new RegExp(utils.accents_search_regex(name), "gi")
        const music = await Music.where("name").regex(regex).limit(20);

        res.status(200).json(music)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get("/artist/:name", async (req, res)=>{
    try {
        const name = req.params.name
        const music = await Music.find({artist: name});

        res.status(200).json(music)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get("/artist/search/:name", async (req, res)=>{
    try {
        const name = req.params.name
        const regex = new RegExp(utils.accents_search_regex(name), "gi")
        const music = await Music.where("artist").regex(regex).limit(20);

        res.status(200).json(music)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get("/genre/:genre", async (req, res)=>{
    try {
        const genre = req.params.genre
        const musics = await Music.find({genre: genre});

        res.status(200).json(musics)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get("/genre/search/:genre", async (req, res)=>{
    try {
        const genre = req.params.genre
        const regex = new RegExp(utils.accents_search_regex(genre), "gi")
        const music = await Music.where("genre").regex(regex).limit(20);

        res.status(200).json(music)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.post('/', async (req, res)=>{

    const musicPostArray = req.body
    
    try{
        //Itera no array
        musicPostArray.map((musicBody)=>{
            const pic = fs.readFileSync(musicBody["picture_path"], {encoding: 'base64'})
            const string64 = "data:image/png;base64,"+ pic        

            const musica = new Music({
                name: musicBody.name,
                artist: musicBody.artist,
                album: musicBody.album,
                released: musicBody.released,
                genre: musicBody.genre,
                path: musicBody.path,
                image: string64
            })

            //Validacao antes do post
            const result = musica.validateSync()
            if (result){
                res.status(422).json(result.errors);
                return;
            }
            const salvarMusica = async () => await musica.save()
            salvarMusica()
        })
        res.status(201).json({mensagem: "Done"});
    }catch(error){
        res.status(500).json({error: error});
    }
})
router.patch("/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const musica = req.body

        const pic = fs.readFileSync(musica["picture_path"])

        const musicValidation = new Music({
            name: musica.name,
            artist: musica.artist,
            album: musica.album,
            released: musica.released,
            genre: musica.genre,
            path: musica.path,
            image: {
                "data": pic,
                "contentType": 'image/png'
            }
        })

        //Validacao antes do post
        const result = musicValidation.validateSync()
        if (result){
            res.status(422).json(result.errors);
            return;
        }

        //Faz o update
        const updatedMusic = await Music.updateOne({_id: id}, musica)

        res.status(200).json(updatedMusic)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
router.delete("/:id", async(req, res)=>{
    try{
        const id = req.params.id
        const deletedMusic = await Music.deleteOne({_id: id})
        res.status(200).json(deletedMusic)
    }catch(error){
        res.status(500).json(error)
    }
})

module.exports = router