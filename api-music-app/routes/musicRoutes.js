const utils = require("../utils/utils")
const {Music, SCHEMA} = require('../models/Music')
const {Image} = require('../models/Images')
const router = require('express').Router()
var jsonValidate = require('jsonschema').Validator;
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
router.get("/loadPicture/:id", async (req, res)=>{
    try {              
        const id = req.params.id
        const image = await Image.findOne({music_id: id});

        if (!image === 0)
        {
            throw new Error("Id not found. ID: " + id);
        }
        res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Length': image.img.data.length});
        res.end(image.img.data);
        
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
router.post("/picture/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const path = req.body["path"]
        const pic = fs.readFileSync(path)

        let image = await Image.findOne({music_id: id});
        if (!image){
            image = new Image();
            image.music_id = id
            image.img.data = pic
            image.img.contentType = 'image/png';
            const newReg = image.save()
            res.status(200).json(newReg)
        }else{
            image.img.data = pic
            image.img.contentType = 'image/png';
            //Faz o update
            const updatedImage = await Image.updateOne({_id: image._id}, image)
            res.status(200).json(updatedImage)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.post('/', async (req, res)=>{

    const musica = req.body

    //Validacao antes do post
    const jsonValidation = new jsonValidate();
    const result = jsonValidation.validate(musica, SCHEMA)
    if (result){
        res.status(422).json(result.errors);
        return;
    }

    //Persistir os dados
    try {
        const p = await Music.create(musica)
        res.status(201).json(p);
    } catch (error) {
        res.status(500).json({error: error});
    }

})
router.patch("/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const musica = req.body

        //Validacao antes do post
        const jsonValidation = new jsonValidate();
        const result = jsonValidation.validate(musica, SCHEMA)
        if (result){
            res.status(422).json(result.errors);
            return;
        }

        //Faz o update
        const updatedMusic = await Music.updateOne({_id: id}, musica)

        res.status(200).json(updatedMusic)
    } catch (error) {
        res.status(500).json({error: error})
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