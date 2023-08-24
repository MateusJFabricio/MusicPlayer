import React, { useState,useContext, useEffect, createRef } from "react";
import "./MediaBar.css";
import nextIcon from "../../assets/next.png"
import playIcon from "../../assets/play.png"
import pauseIcon from "../../assets/pause.png"
import MusicDetails from "../MusicDetails/MusicDetails";
import {MusicContext} from '../../context/MusicContext'

const MediaBar = () => {
  const URL_API = "http://localhost:3000/"
  const [audio, setAudio] = useState()
  const [playing, setPlaying] = useState(false)
  const {musicStack, setMusicStack} = useContext(MusicContext)
  let musicUrl = null
  const audioRef = createRef();

  const loadMusicStream = async (id)=>{
    try {
      const blob = await fetch(URL_API + "music/loadmusic/" + id)
      .then(response=> response.blob())

      musicUrl = URL.createObjectURL(blob)
      return musicUrl
      
    } catch (error) {
      console.error(error);
    }

  }

  const handlePlayPause = async()=>{
    if (!musicStack || musicStack.lenght === 0){
      return
    }
    
    if (!audio){
      const aux = await loadMusicStream(musicStack[0]._id)
      setAudio(aux)
      return 
    }
    if (!playing){
      handlePlay()
    }else{
      handlePause()
    }
  }

  const handlePlay = () => {
    audioRef.current.play()
    setPlaying(true)
  }

  const handlePause = () => {
    audioRef.current.pause()
    setPlaying(false)
  }

  const handleTimeUpdate = () => {
    // this.setState({
    //   currentTime: this.audioRef.current.currentTime,
    //   duration: this.audioRef.current.duration
    // })
  }

  const handleMusicEnded = ()=>{
    console.log("A musica acabou")
  }

  return (
    <div className="mediabar-container">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleMusicEnded} src={audio} autoPlay controls/>
      {/* Media bar progress */}
      <div className="mediabar-progressinfo">
        <div className="mediabar-infoinit">02:56</div>
        {/* Progress Bar - TODO */}
        <div className="frame">
          <div className="overlap-group"></div>
        </div>
        {/* End TODO */}
        <div className="mediabar-infoend">03:56</div>
      </div>
      {/* Media bar controls */}
      <div className="music-controls">
        <div className="music-details">
            <MusicDetails music={musicStack[0]}/>
        </div>
        <div className="controls">
          <div className="play">
          <img onClick={handlePlayPause} alt="Play Music" src={playing?pauseIcon:playIcon}/>
          </div>
          <div className="next">
            <div className="overlap-group-2">
              <img alt="Next Music" src={nextIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaBar;