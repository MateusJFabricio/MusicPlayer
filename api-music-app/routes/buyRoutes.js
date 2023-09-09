const router = require('express').Router()
const {Music} = require('../models/Music')
const {AddMusicApprove,
    Clean,
    GetSongs,
    GetSongsAndClean,
    WaitingApprove, 
    Approve, 
    Approved} = require('../musicApprove/MusicApprove')

router.post("/", (req, res)=>{
    try {
        const musicas = req.body

        if (!musicas){
            throw new Error('Error: Parameter missing')
        }

        if (!Array.isArray(musicas)){
            throw new Error('Error: Parameter wrong. Expecting array')
        }

        musicas.forEach((song)=>{
            const result = new Music(song).validateSync()
            if (result){
                res.status(422).json(result.errors);
                return;
            }
        })

        //Adiciona musicas para aprovar
        AddMusicApprove(musicas)

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.get("/waiting_approve", (req, res)=>{
    try {
        //Verifica se esta aguardando aprovação
        res.status(200).json({waitingApprove: WaitingApprove()});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.get("/songs", (req, res)=>{
    try {
        //Verifica se esta aguardando aprovação
        res.status(200).json(GetSongs());
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.get("/approved", (req, res)=>{
    try {
        //Verifica se esta aguardando aprovação
        res.status(200).json({approved: Approved()});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.get("/songsandclear", (req, res)=>{
    try {
        //Verifica se esta aguardando aprovação
        res.status(200).json(GetSongs());
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})
router.head("/clean", (req, res)=>{
    try {
        Clean()
        //retorna status 200
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})
router.head("/approve", (req, res)=>{
    try {
        Approve()
        //retorna status 200
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).json({error: error.message});
    }
})

module.exports = router