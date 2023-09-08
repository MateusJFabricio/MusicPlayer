const router = require('express').Router()
const {Music} = require('../models/Music')
const {Albuns} = require('../models/Album')
const utils = require("../utils/utils")

//Busca todos os albuns - SELECT Algum, Image -> GROUP BY Album
router.get("/albuns", async (req, res)=>{
    try {
        const albuns = await Music.aggregate().group(
            {
                 _id: "$album",
                 name: { $first : "$album" },
                 artist: { $first : "$artist" },
                 image: { $first : "$image" }
                }).limit(20).exec()
        res.status(200).json(albuns)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Busca todos albuns com o nome
router.get("/albuns/search/:name", async (req, res)=>{
    try {
        const albumName = req.params.name
        const regex = new RegExp(utils.accents_search_regex(albumName), "gi")
        const albunsRepetidos = await Music.aggregate().group(
            {
                 _id: "$album",
                 name: { $first : "$album" },
                 artist: { $first : "$artist" },
                 image: { $first : "$image" }
                })
        let albumDistinct = []
        albunsRepetidos.forEach((album)=>{
            if (regex.test(album.name.toLowerCase()))
            {
                albumDistinct.push(album)
            }
        })

        res.status(200).json(albumDistinct)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Busca musicas do album - SELECT * -> GROUP BY Album
router.get("/albuns/songs/:album", async (req, res)=>{
    try {
        const albumName = req.params.album
        const regex = new RegExp(utils.accents_search_regex(albumName), "gi")
        const musicas = await Music.find({album: albumName})// where("album").regex(regex).limit(20);
        res.status(200).json(musicas)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Busca generos de musicas
router.get("/genres", async (req, res)=>{
    try {
        const genres = await Music.find().distinct("genre")
        res.status(200).json(genres)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Busca musicas por genero
router.get("/genres/:genre", async (req, res)=>{
    try {
        const genre = req.params.genre
        const albuns = await Albuns.find({genre: genre}).limit(10)
        res.status(200).json({
            genre: genre,
            albuns: albuns
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Busca albuns por artista
router.get("/artist/search/:name", async (req, res)=>{
    try {
        const artistName = req.params.name
        const regex = new RegExp(utils.accents_search_regex(artistName), "gi")
        const albuns = await Albuns.where("artist").regex(regex);
        let albumDistinct = []
        albuns.forEach((album)=>{
            if (!albumDistinct.find((element)=>element.artist === album.artist))
            {
                albumDistinct.push(album)
            }
        })
        res.status(200).json(albumDistinct)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router