import React, { useState,useContext, useEffect, createRef } from "react";
import "./MediaBar.css";
import nextIcon from "../../assets/next.png"
import playIcon from "../../assets/play.png"
import pauseIcon from "../../assets/pause.png"
import MusicDetails from "../MusicDetails/MusicDetails";
import {MusicContext} from '../../context/MusicContext'
import {ApiContext} from '../../context/ApiContext'
import {LoginContext} from '../../context/LoginContext'


const MediaBar = () => {
  const {URL_API} = useContext(ApiContext)
  const {musicStack, setMusicStack} = useContext(MusicContext)
  const {level} = useContext(LoginContext)

  const [currentFormatTime, setCurrentFormatTime] = useState("00:00")
  const [durationFormatted, setDurationFormatted] = useState("00:00")
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audio, setAudio] = useState()
  const [playing, setPlaying] = useState(false)
  const [currentMusic, setCurrentMusic] = useState()
  const [sliderMousePosition, setSliderMousePosition] = useState(0)
  const [volume, setVolume] = useState(100)

  const audioRef = createRef();

  let musicUrl = null
  
  useEffect(() => {
    if (!playing && (typeof currentMusic === 'undefined' || currentMusic === null)){
      loadMusic()
    }
  }, [musicStack])
  
  const loadMusicStream = async (id)=>{
    try {
      const blob = await fetch(URL_API.current + "music/loadmusic/" + id)
      .then(response=> response.blob())

      musicUrl = URL.createObjectURL(blob)
      return musicUrl
      
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(()=>{
    if (currentMusic){
      const loadStream = async () => { setAudio(await loadMusicStream(currentMusic._id))}
      loadStream()
    }
      
  }, [currentMusic])

  const loadMusic = ()=>{

    if (musicStack.lenght === 0){
      return
    }
    
    setCurrentMusic(musicStack[0])
  }
  const handlePlayPause = async()=>{
    if (level > 1){
      if (!playing){
        handlePlay()
      }else{
        handlePause()
      }
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
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
      setCurrentFormatTime(formatTime(audioRef.current.currentTime))
      setDurationFormatted(formatTime(audioRef.current.duration))
  }

  const formatTime = (seconds)=> {
    if (seconds > 0)
    {
      let minutes = Math.floor(seconds / 60);
      minutes = (minutes >= 10) ? minutes : "0" + minutes;
      seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : "0" + seconds;
      return minutes + ":" + seconds;
    }
    return "00:00"
  }
  const handleBtnNextSong = ()=>{
    if (level > 1){
      handleMusicEnded()
    }
  }
  const handleMusicEnded = ()=>{
      setPlaying(false)
      setCurrentMusic(null)
      const stack = musicStack.slice(1)
      setMusicStack(stack)
      setAudio(null)
      audioRef.current.load()
  }
  const handleSliderMouseMove = (e)=>{
    const mouseAbsolutePosition = e.clientX - e.target.offsetLeft
    const mousePosition = (parseInt(e.target.max,10) / e.target.clientWidth) *  mouseAbsolutePosition;
    setSliderMousePosition(mousePosition)
  }
  const handleSliderClick = ()=>{
    if (level > 1){
      audioRef.current.currentTime = sliderMousePosition
      
    }
  }

  useEffect(()=>{
    audioRef.current.volume = volume / 100
  }, [volume])

  const handleVolumnSliderChange = (e)=>{
    if (level > 1){
      setVolume(e.target.value)
    }
  }

  return (
    <div className="mediabar-container">
      <audio onLoadedData={handlePlay} ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleMusicEnded} src={audio} />
      {/* Media bar progress */}
      <div className="mediabar-progressinfo">
        <div className="mediabar-infoinit">{currentFormatTime}</div>
        <div className="frame">
          <input 
                className="mediabar-slider"
                onChange={()=>{}}
                onClick={handleSliderClick} 
                onMouseMove={handleSliderMouseMove} 
                type="range" min="0" max={duration||"0"} value={currentTime||"0"} id="progressSlider" title="progressSlider" placeholder="slider"/>
        </div>
        <div className="mediabar-infoend">{durationFormatted}</div>
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
              <img alt="Next Music" onClick={handleBtnNextSong} src={nextIcon} />
            </div>
          </div>
          <div className="volumnContainer">
            <span className="volumnSlider-tag">Volume</span>
            <input className="volumnSlider" onChange={handleVolumnSliderChange} value={volume} type="range" min="0" max="100" id="sliderVolumn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaBar;