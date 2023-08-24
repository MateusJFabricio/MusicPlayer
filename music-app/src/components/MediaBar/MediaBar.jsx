import React, { useState } from "react";
import "./MediaBar.css";
import nextIcon from "../../assets/next.png"
import playIcon from "../../assets/play.png"
import MusicDetails from "../MusicDetails/MusicDetails";

const MediaBar = () => {
  const [actualMusic, setActualMusic] = useState()

  return (
    <div className="mediabar-container">
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
            <MusicDetails music={actualMusic}/>
        </div>
        <div className="controls">
          <div className="play">
            <img alt="Play Music" src={playIcon}/>
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