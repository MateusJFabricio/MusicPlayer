let songsApprove = []
let waiting_aprove = false

function AddMusicApprove(songs){
    songsApprove = []
    songsApprove.push(...songs)
    waiting_aprove = songsApprove.length > 0
}

function Clean(){
    songsApprove = []
    waiting_aprove = false
}

function GetSongs(){
    return songsApprove
}
function GetSongsAndClean(){
    let songs = [...GetSongs()]
    Clean()
    return songs
}

function WaitingApprove(){
    return waiting_aprove
}
function Approved(){
    return !waiting_aprove&&songsApprove.length > 0
}
function Approve(){
    waiting_aprove = false
}

module.exports = {
    AddMusicApprove,
    Clean,
    GetSongs,
    GetSongsAndClean,
    WaitingApprove,
    Approve,
    Approved
}